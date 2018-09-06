import gql from 'graphql-tag';

export default gql`
  subscription {
    newQuestionVote {
      node {
        id
        isUpVote
        question {
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
        user {
          id
        }
      }
    }
  }
`;
