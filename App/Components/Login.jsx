import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

import { CLIENT_ID } from '../constants';

const Login = props => (
  <div>
    <GoogleLogin
      onSuccess={props.setCridentials}
      onFailure={props.errorMessage}
      clientId={CLIENT_ID}
    />
  </div>
);

Login.propTypes = {
  setCridentials: PropTypes.func.isRequired,
  errorMessage: PropTypes.func.isRequired,
};

export default Login;
