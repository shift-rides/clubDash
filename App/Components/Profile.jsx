import React from 'react'
import axios from 'axios'
import {DUMMY_EVENTS} from '../../Library/const'
import {
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Label
} from 'react-bootstrap'

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: DUMMY_EVENTS,
      profileId:null,
      userProfile:{imageUrl: 'www', name:'test'}
    }
  }
  componentWillMount () {
    axios.get('/userInfoPapulate')
      .then(profile => {
        this.setState({ profile: profile.data.eventRegistered })
        this.setState({ profileId: profile.data._id})
        this.setState({ userProfile: profile.data})
        //console.log('profile', this.state.userProfile)

      })
  }

  leaveTrip (e) {
  //  console.log(e);
    const info = {
      riderId: this.state.profileId,
      eventId: e._id,
      freeSeats: e.freeSeats
 }
    //console.log(info)
    //console.log('trip left!');
    axios.post('/removeUserFromEvent', info)
      .then((res) => {
        if (res.data.success) {
        //  console.log("I'm done with deleting")
          this.forceUpdate();
        }
      })
  }

  deleteAccount () {
  //  console.log('Account deleted!')
  }

  render () {
    return (
      <div className='profile-content'>
      <div className = "column" style= {{float:'left', width:'50%'}}>
        <Image src={this.state.userProfile.imageUrl} circle style={{marginLeft: '25%',
    marginBottom: '15px'}}/>
  <p style = {{marginLeft: '20px'}}>{this.state.userProfile.name}</p>
      <Button bsStyle="warning" onClick={this.deleteAccount}>Delete Account</Button>
    </div>
      <div className = "column" style= {{float:'left', width:'50%'}}>
        <h2></h2>
      <Label bsStyle="success" style = {{fontSize: '16px'}}>Your trips</Label>
    <ListGroup style = {{marginTop: "10px"}}>
          {this.state.profile.map((event, index) => {
            return <ListGroupItem key={index} style = {{fontSize: '14px'}}>{event.organizer.name}'s Trip: <Button onClick={this.leaveTrip.bind(this,event)}>Leave Trip</Button></ListGroupItem>
          })}
        </ListGroup>
      </div>


      </div>
    )
  }
}

export default Profile
