import React, { PureComponent } from 'react';

class Signup extends PureComponent {
  state = { email: '', password: '' };

  render() {
    const { email, password } = this.setState;
    return (
      <div>
        <p>dikken</p>
      </div>
    );
  }
}

export default Signup;
