import gql from 'graphql-tag';

export default gql`
  mutation VoteOnAnswerMutation($answerId: ID!, $isUpVote: Boolean!) {
    voteOnAnswer(answerId: $answerId, isUpVote: $isUpVote) {
      id
    }
  }
`;
