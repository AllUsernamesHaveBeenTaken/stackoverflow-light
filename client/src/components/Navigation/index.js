import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import SearchBar from '../SearchBar';
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

const gradientButton = {
  background: 'linear-gradient(to right, rgba(168,224,255,1) 0%,rgba(107,241,120,1) 100%)',
  borderRadius: 20,
  padding: '5px 10px',
  color: '#F7F7F2'
};

class Navigation extends PureComponent {
  state = {};

  render() {
    const authToken = sessionStorage.getItem(AUTH_TOKEN);

    return (
      <div style={wrapper}>
        <Link style={logoText} to="/">
          <p>StackOverflow</p>
          <p style={logoLightText}>Light</p>
        </Link>
        <SearchBar />
        <div>
          {authToken ? (
            <div>
              <Link
                style={{ ...navItem, ...gradientButton }}
                to="/askquestion"
                className="ml1 no-underline black"
              >
                Ask a Question
              </Link>
              <Link to="/" style={navItem} onClick={() => sessionStorage.removeItem(AUTH_TOKEN)}>
                Log out
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/login" style={{ ...navItem, ...gradientButton }}>
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
