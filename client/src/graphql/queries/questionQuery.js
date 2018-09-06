import gql from 'graphql-tag';

export default gql`
  query QuestionQuery($id: ID!) {
    question(id: $id) {
      id
      title
      createdAt
      description
      votes {
        id
        isUpVote
      }
      askedBy {
        id
        username
      }
      answers {
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
`;
