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
      profile: DUMMY_EVENTS,
      profileId:null
    }
  }
  componentWillMount () {
    axios.get('/userInfoPapulate')
      .then(profile => {
        console.log('profile', profile)
        this.setState({ profile: profile.data.eventRegistered })
        this.setState({ profileId: profile.data._id})
      })
  }

  leaveTrip (e) {
    console.log(e);
    const info = {riderId: this.state.profileId, eventId: e._id }
    console.log(info)
    console.log('trip left!');
    axios.post('/removeUserFromEvent', info)
      .then((res) => {
        if (res.data.success) {
          console.log("I'm done with deleting")
          this.forceUpdate();
        }
      })
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
            return <ListGroupItem key={index}>{event.desc}'s Trip: <Button onClick={this.leaveTrip.bind(this,event)}>Click to Leave Trip</Button></ListGroupItem>
          })}
        </ListGroup>
        <Button onClick={this.deleteAccount}>Delete Account</Button>
      </div>
    )
  }
}

export default Profile
