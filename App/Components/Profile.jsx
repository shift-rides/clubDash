import React from 'react'
import axios from 'axios'
import {DUMMY_EVENTS} from '../../Library/const'
import {
  Image,
  ListGroup,
  ListGroupItem,
  Button
} from 'react-bootstrap'

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: {}
    }
  }
  componentWillMount () {
    axios.get('/userInfo')
      .then(profile => this.setState({ profile: profile.data }))
  }

  leaveTrip () {
    console.log('trip left!')
  }

  deleteAccount () {
    console.log('Account deleted!')
  }

  render () {
    return (
      <div className='contents'>
        <Image src={this.state.profile.imageUrl} circle />
        <p>{this.state.profile.name}</p>
        <ListGroup>
          {DUMMY_EVENTS.map((event, index) => {
            return <ListGroupItem key={index}>{event.organizer}'s Trip: <Button onClick={this.leaveTrip.bind(this)}>Click to Leave Trip</Button></ListGroupItem>
          })}
        </ListGroup>
        <Button onClick={this.deleteAccount}>Delete Account</Button>
      </div>
    )
  }
}

export default Profile
