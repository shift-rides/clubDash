import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';

import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import { SERVER_URL } from './constants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cridentials: false,
    };
    this.setCridentials = this.setCridentials.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
  }

  setCridentials(creds) {
    axios.post(`${SERVER_URL}/login`, {
      profile: creds.profileObj,
    })
      .then((res) => {
        if (res.data.success) {
          this.setState({
            cridentials: res.data.user,
          });
        } else {
          this.errorMessage('Invalid google profile');
        }
      });
  }

  errorMessage(msg) {
    // TODO: Create a custom Error modal
    alert(msg);
  }

  render() {
    if (!this.state.cridentials) {
      return (<Login
        setCridentials={this.setCridentials}
        errorMessage={this.errorMessage}
      />);
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/dashboard"
            render={() => <Dashboard user={this.state.cridentials} />}
          />
          <Route
            path="/"
            render={() => <Redirect to="/dashboard" />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
