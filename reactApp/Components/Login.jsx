import React from 'react';
import {
  Button,
} from 'react-bootstrap';

const Login = props => (
  <div>
    <Button onClick={props.setCridentials} >Login</Button>
  </div>
);

Login.propTypes = {
  setCridentials: React.PropTypes.func.isRequired,
};

export default Login;
