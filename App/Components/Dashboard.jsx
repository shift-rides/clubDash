import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import {
  Navbar,
  Jumbotron,
  Modal,
  Nav,
  NavDropdown,
  NavItem,
  MenuItem,
  Glyphicon
} from 'react-bootstrap'

import axios from 'axios'
import Profile from './Profile'
import ClubProfile from './ClubProfile'
import Clubs from './Clubs'
import MainWaiver from './MainWaiver'
import Calendar from './Calendar'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: null,
      showModal: false
    }
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
  }
  componentWillMount () {
    axios.get('/userInfo')
    .then(profile => this.setState({ profile: profile.data }, () => {
      if (this.state.profile.waivers.length < 1 && !this.state.showModal) {
        this.openModal()
      }
    }))
  }

  openModal () {
    this.setState({ showModal: true })
  }

  closeModal (information) {
    axios.post('/mainWaiver', information)
    .then((res) => {
      if (res.data.success) { // TODO: Make sure the waiver was finsihed
        this.setState({ showModal: false })
      }
    })
  }

  render () {
    return (
      <div>
        <Navbar>
          <Nav pullLeft>
            <NavDropdown id='basic-nav-dropdown' title={<Glyphicon glyph='menu-hamburger' />}>
              <MenuItem href='#/'>HOME</MenuItem>
              <MenuItem href='#/profile'>PROFILE</MenuItem>
            </NavDropdown>
            <Navbar.Header>
              <Navbar.Brand className='navbar-brand'>
                <img src='./shift_logo.png' />
              </Navbar.Brand>
            </Navbar.Header>
          </Nav>
          <Nav pullRight>
            <NavItem onClick={() => { axios.post('/logout') }} href='/login'>LOGOUT</NavItem>
          </Nav>
        </Navbar>
        <Jumbotron>
          <Switch>
            <Route
              path='/clubs/:clubId'
              component={ClubProfile}
            />
            <Route
              path='/clubs'
              component={Clubs}
            />
            <Route
              path='/profile'
              component={Profile}
            />
            <Route
              path='/'
              component={Calendar}
            />
          </Switch>
        </Jumbotron>
        <Modal show={this.state.showModal}>
          <MainWaiver profile={this.state.profile} closeModal={this.closeModal} />
        </Modal>
      </div>
    )
  }
}

export default Dashboard
