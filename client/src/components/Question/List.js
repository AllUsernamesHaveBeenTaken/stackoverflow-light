import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import QuestionItem from './Item';

const FEED_QUERY = gql`
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

const feedWrapper = {
  marginLeft: 100
};

const questionStyle = {
  marginBottom: 10,
  boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.15)'
};

const title = {
  fontSize: 35,
  margin: 30,
  color: '#A8E0FF'
};

class QuestionList extends PureComponent {
  state = {};

  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;

          return (
            <div>
              <p style={title}>Questions</p>
              <div style={feedWrapper}>
                {data.feed.questions.map(question => (
                  <QuestionItem
                    style={questionStyle}
                    key={question.id}
                    votes={question.votes.length}
                    answers={0}
                    title={question.title}
                    username={question.askedBy.username}
                    date={question.createdAt}
                  />
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default QuestionList;
