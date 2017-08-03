import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';

import Dashboard from './Components/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: false,
    };
    this.errorMessage = this.errorMessage.bind(this);
  }

  errorMessage(msg) {
    // TODO: Create a custom Error modal
    alert(msg);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/dashboard"
            render={() => <Dashboard />}
          />
          <Route
            path="/"
            render={() => <Redirect to="/dashboard/profile" />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
