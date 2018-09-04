import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { AUTH_TOKEN } from '../../utils/constants';

const wrapper = {
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'Space-between',
  padding: '0px 30px'
};

const logoText = {
  textDecoration: 'none',
  fontSize: 20,
  color: '#2E3532'
};

const logoLightText = {
  color: '#A8E0FF',
  justifyContent: 'flex-end',
  display: 'flex'
};

const navItem = {
  textDecoration: 'none',
  color: '#2E3532',
  fontSize: 20,
  marginLeft: 20
};

const loginButton = {
  background: 'linear-gradient(to right, rgba(168,224,255,1) 0%,rgba(107,241,120,1) 100%)',
  borderRadius: 20,
  padding: '5px 10px',
  color: '#F7F7F2'
};

class Navigation extends PureComponent {
  state = {};

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
      <div style={wrapper}>
        <Link style={logoText} to="/">
          <p>StackOverflow</p>
          <p style={logoLightText}>Light</p>
        </Link>
        <div>
          {authToken ? (
            <Link to="/" style={navItem} onClick={() => localStorage.removeItem(AUTH_TOKEN)}>
              log out
            </Link>
          ) : (
            <div>
              <Link to="/login" style={{ ...navItem, ...loginButton }}>
                Log in
              </Link>
              <Link to="/signup" style={navItem}>
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Navigation);
