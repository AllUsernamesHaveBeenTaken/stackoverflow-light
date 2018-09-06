import gql from 'graphql-tag';

export default gql`
  mutation AskQuestionMutation($title: String!, $description: String!) {
    askQuestion(title: $title, description: $description) {
      id
      title
      description
      createdAt
      askedBy {
        questions {
          id
        }
      }
    }
  }
`;
