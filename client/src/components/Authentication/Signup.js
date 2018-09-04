import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import { AUTH_TOKEN } from '../../utils/constants';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, username: $username) {
      token
    }
  }
`;

const wrapper = {
  display: 'flex',
  justifyContent: 'center'
};

const loginCard = {
  display: 'flex',
  padding: 50,
  backgroundColor: '#F7F7F2',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '25%'
};

const title = {
  fontSize: 35,
  margin: 20,
  color: '#2E3532',
  alignSelf: 'flex-start',
  display: 'flex'
};

const input = {
  width: '100%',
  padding: '12px 20px',
  margin: '8px 0',
  boxSizing: 'border-box',
  border: 'solid 1px #2E3532'
};

const button = {
  background: 'linear-gradient(to right, rgba(168,224,255,1) 0%,rgba(107,241,120,1) 100%)',
  width: '100%',
  borderRadius: 10,
  padding: 5,
  fontSize: 15,
  marginTop: 20,
  outline: 'none'
};

const smallText = {
  fontSize: 12,
  marginTop: 10,
  color: '#2E353270',
  cursor: 'pointer',
  textDecoration: 'none'
};

class Signup extends PureComponent {
  state = { email: '', password: '', username: '' };

  confirm = async data => {
    const { history } = this.props;
    this.saveUserData(data.signup.token);
    history.push('/');
  };

  // @TODO Save as cookie!!
  saveUserData = token => {
    sessionStorage.setItem(AUTH_TOKEN, token);
  };

  render() {
    const { email, password, username } = this.state;
    return (
      <div style={wrapper}>
        <div style={loginCard}>
          <p style={title}>Sign up</p>
          <input
            style={input}
            value={username}
            name={username}
            onChange={({ target }) => this.setState({ username: target.value })}
            type="text"
            placeholder="Username"
          />
          <input
            style={input}
            value={email}
            name={email}
            onChange={({ target }) => this.setState({ email: target.value })}
            type="text"
            placeholder="Email address"
          />
          <input
            style={input}
            value={password}
            name={password}
            onChange={({ target }) => this.setState({ password: target.value })}
            type="password"
            placeholder="Password"
          />
          <Mutation
            mutation={SIGNUP_MUTATION}
            variables={{ email, password, username }}
            onCompleted={data => this.confirm(data)}
          >
            {mutation => (
              <button onClick={mutation} type="button" style={button}>
                Sign up
              </button>
            )}
          </Mutation>
          <Link to="login" style={smallText}>
            Already have an account?
          </Link>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.shape({}).isRequired
};

export default Signup;
