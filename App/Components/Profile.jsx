import React from 'react'
import axios from 'axios'
import {
  Image
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
  render () {
    return (
      <div className='contents'>
        <Image src={this.state.profile.imageUrl} circle />
        <p>{this.state.profile.name}</p>
      </div>
    )
  }
}

export default Profile
