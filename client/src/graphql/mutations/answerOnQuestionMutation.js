import gql from 'graphql-tag';

export default gql`
  mutation AnswerOnQuestionMutation($questionId: ID!, $content: String!) {
    answerOnQuestion(questionId: $questionId, content: $content) {
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
`;
