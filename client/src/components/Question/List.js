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
          isUpVote
        }
        askedBy {
          username
        }
        createdAt
        answers {
          id
          content
          votes {
            id
          }
          createdAt
          answeredBy {
            username
          }
        }
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
          isUpVote
        }
        askedBy {
          username
        }
        createdAt
        answers {
          id
          content
          votes {
            id
          }
          createdAt
          answeredBy {
            username
          }
        }
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

const headerWrapper = {
  display: 'flex',
  alignItems: 'center'
};

const filterWrapper = {
  display: 'flex',
  marginRight: 80
};

const filterItem = {
  marginRight: 20,
  padding: '5px 10px',
  backgroundColor: '#2E3532',
  color: '#fff',
  borderRadius: 15,
  cursor: 'pointer'
};

class QuestionList extends PureComponent {
  state = {
    filter: 'new'
  };

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

  sort = (a, b) => {
    switch (this.state.filter) {
      case 'new':
        return this.sortByDate(a, b);
        break;
      case 'hot':
        return this.sortByTotalVotesAndAnswers(a, b);
        break;

      default:
        break;
    }
  };

  sortByDate = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  };

  totalVotes = votes => {
    const totalTrue = votes.filter(vote => vote.isUpVote && vote).length;
    const totalFalse = votes.filter(vote => !vote.isUpVote && vote).length;
  
    return totalTrue - totalFalse;
  };

  sortByTotalVotesAndAnswers = (a, b) => {
    let totalB = this.totalVotes(b.votes) + b.answers.length;
    let totalA = this.totalVotes(a.votes) + a.answers.length;

    return totalB - totalA;
  };

  render() {
    const { filter } = this.state;

    return (
      <div>
        <div style={headerWrapper}>
          <p style={titleStyle}>Questions</p>
          <div style={filterWrapper}>
            <p
              style={filter === 'new' ? { ...filterItem, backgroundColor: '#6BF178' } : filterItem}
              onClick={() => this.setState({ filter: 'new' })}
            >
              New
            </p>
            <p
              style={filter === 'hot' ? { ...filterItem, backgroundColor: '#6BF178' } : filterItem}
              onClick={() => this.setState({ filter: 'hot' })}
            >
              Hot
            </p>
          </div>
        </div>
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
                        .sort((a, b) => this.sort(a, b))
                        .map(({ id, votes, title, askedBy, createdAt, answers }) => (
                          <QuestionItem
                            style={questionStyle}
                            key={id}
                            votes={votes}
                            answers={answers.length}
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
