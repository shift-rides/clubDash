import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cridentials: false,
    };
    this.setCridentials = this.setCridentials.bind(this);
  }

  setCridentials(creds) {
    if (creds.profileObj.email.split('@') !== 'colgate.edu') {
      console.log('THIS IS NOT A COLGATE EMAIL AAAAAGH');
    } else {
      this.setState({
        cridentials: creds,
      });
      console.log(creds);
    }
  }

  render() {
    if (!this.state.cridentials) {
      return <Login setCridentials={this.setCridentials} />;
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
