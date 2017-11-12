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
      profile: DUMMY_EVENTS
    }
  }
  componentWillMount () {
    axios.get('/userInfoPapulate')
      .then(profile => {
        console.log('profile', profile)
        this.setState({ profile: profile.data.eventRegistered })
      })
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
          {this.state.profile.map((event, index) => {
            console.log()
            return <ListGroupItem key={index}>{event.desc}'s Trip: <Button onClick={this.leaveTrip.bind(this)}>Click to Leave Trip</Button></ListGroupItem>
          })}
        </ListGroup>
        <Button onClick={this.deleteAccount}>Delete Account</Button>
      </div>
    )
  }
}

export default Profile
