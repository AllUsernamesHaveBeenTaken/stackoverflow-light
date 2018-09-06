import gql from 'graphql-tag';

export default gql`
  subscription {
    newAnswerVote {
      node {
        id
        isUpVote
        answer {
          id
          createdAt
          content
          votes {
            id
            isUpVote
          }
          answeredBy {
            id
            username
          }
        }
      }
    }
  }
`;
