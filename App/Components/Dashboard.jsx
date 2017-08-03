import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Profile from './Profile';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>HELLO THERE</h1>
        {/* <Switch>
          <Route path="/dashboard/profile" render={() => <Profile user={this.props.user} />} />
        </Switch> */}
      </div>
    );
  }
}

// Dashboard.propTypes = {
//   user: PropTypes.shape({
//     imageUrl: PropTypes.string,
//   }).isRequired,
// };

export default Dashboard;
