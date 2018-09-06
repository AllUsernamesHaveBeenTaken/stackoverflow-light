import gql from 'graphql-tag';

export default gql`
  mutation VoteOnQuestionMutation($questionId: ID!, $isUpVote: Boolean!) {
    voteOnQuestion(questionId: $questionId, isUpVote: $isUpVote) {
      id
    }
  }
`;
