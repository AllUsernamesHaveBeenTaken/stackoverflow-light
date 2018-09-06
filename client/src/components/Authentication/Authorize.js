import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { AUTH_TOKEN } from '../../utils/constants';

class Authorize extends PureComponent {
  render() {
    const authToken = sessionStorage.getItem(AUTH_TOKEN);
    const { children } = this.props;
    return <div>{authToken && children}</div>;
  }
}

Authorize.propTypes = {
  children: PropTypes.shape({}).isRequired
};

export default Authorize;
