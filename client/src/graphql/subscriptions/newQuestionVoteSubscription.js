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
            id
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
              id
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
