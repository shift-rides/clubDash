import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Dashboard from './Components/Dashboard'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.errorMessage = this.errorMessage.bind(this);
  }

  errorMessage(msg) {
    // TODO: Create a custom Error modal
    alert(msg)
  }

  render () {
    return (
      <HashRouter>
        <Dashboard />
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
