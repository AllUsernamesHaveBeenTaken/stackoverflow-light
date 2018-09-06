import gql from 'graphql-tag';

export default gql`
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
          id
          username
        }
        createdAt
        answers {
          id
          content
          votes {
            id
            isUpVote
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
