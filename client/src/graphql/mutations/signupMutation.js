import gql from 'graphql-tag';

export default gql`
  mutation SignupMutation($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, username: $username) {
      token
    }
  }
`;
