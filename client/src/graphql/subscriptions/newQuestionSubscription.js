import gql from 'graphql-tag';

export default gql`
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
    }
  }
`;
