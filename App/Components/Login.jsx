import React from 'react';
import {
  Button,
} from 'react-bootstrap';
import GoogleLogin from 'react-google-login';

const CID = "200982122162-bd6fmgfc10jk87p650gc5lrr1hu3tlcd.apps.googleusercontent.com";

const Login = props => (
  <div>
    <GoogleLogin
      onSuccess={props.setCridentials}
      onFailure={console.log}
      clientId={CID}
    />
  </div>
);

Login.propTypes = {
  setCridentials: React.PropTypes.func.isRequired,
};

export default Login;
