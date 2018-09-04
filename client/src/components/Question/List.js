import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import QuestionItem from './Item';
import { FilterConsumer } from '../../Contexts/FilterContext';

export const FEED_QUERY = gql`
  {
    feed {
      count
      questions {
        id
        title
        votes {
          id
        }
        askedBy {
          username
        }
        createdAt
      }
    }
  }
`;

const NEW_QUESTIONS_SUBSCRIPTION = gql`
  subscription {
    newQuestion {
      node {
        id
        title
        votes {
          id
        }
        askedBy {
          username
        }
        createdAt
      }
    }
  }
`;

const feedWrapper = {
  marginLeft: 100
};

const questionStyle = {
  marginBottom: 10,
  boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.15)'
};

const titleStyle = {
  fontSize: 35,
  margin: 30,
  color: '#A8E0FF'
};

class QuestionList extends PureComponent {
  state = {};

  subscribeToNewQuestions = subscribeToMore => {
    subscribeToMore({
      document: NEW_QUESTIONS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newQuestion = subscriptionData.data.newQuestion.node;
        console.log(prev);

        const idExists =
          prev.feed.questions.filter(question => question.id === newQuestion.id).length > 0;

        console.log(idExists);

        if (idExists) return prev;

        return Object.assign({}, prev, {
          feed: {
            questions: [newQuestion, ...prev.feed.questions],
            count: prev.feed.count + 1,
            /* eslint-disable */
            __typename: prev.feed.__typename
          }
        });
      }
    });
  };

  render() {
    return (
      <div>
        <p style={titleStyle}>Questions</p>
        <FilterConsumer>
          {({ filter }) => (
            <Query query={FEED_QUERY}>
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <div>Loading</div>;
                if (error) return <div>Error</div>;

                this.subscribeToNewQuestions(subscribeToMore);

                return (
                  <div>
                    <div style={feedWrapper}>
                      {data.feed.questions
                        .filter(({ title }) => title.toLowerCase().includes(filter.toLowerCase()))
                        .map(({ id, votes, title, askedBy, createdAt }) => (
                          <QuestionItem
                            style={questionStyle}
                            key={id}
                            votes={votes.length}
                            answers={0}
                            title={title}
                            username={askedBy.username}
                            date={createdAt}
                          />
                        ))}
                    </div>
                  </div>
                );
              }}
            </Query>
          )}
        </FilterConsumer>
      </div>
    );
  }
}

export default QuestionList;
