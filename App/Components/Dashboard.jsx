import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
} from 'react-router-dom';
import {
  Navbar,
  Jumbotron,
  Nav,
  NavDropdown,
  NavItem,
  MenuItem,
  Glyphicon,
} from 'react-bootstrap';
import axios from 'axios';

import Profile from './Profile';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }

  componentWillMount() {
    axios.get('/userInfo')
      .then((profile) => { this.setState({ profile: profile.data }); });
  }
  render() {
    return (
      <div>
        <Navbar>
          <Nav>
            <NavDropdown id="basic-nav-dropdown" title={<Glyphicon glyph="menu-hamburger" />}>
              <MenuItem href="#/dashboard/profile">Your Profile</MenuItem>
            </NavDropdown>
          </Nav>
          <Navbar.Header>
            <Navbar.Brand>
              ClubDash
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem onClick={() => { axios.post('/logout'); }} href="/login">Logout</NavItem>
          </Nav>
        </Navbar>
        <Jumbotron>
          <Switch>
            <Route
              path="/dashboard/profile"
              render={() => <Profile profile={this.state.profile} />}
            />
          </Switch>
        </Jumbotron>
      </div >
    );
  }
}

export default Dashboard;
