import React from 'react';
import axios from 'axios';
import {
  Image,
  Button,
} from 'react-bootstrap';

class ClubProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
    this.joinClub = this.joinClub.bind(this);
  }
  componentWillMount() {
    axios.get(`/clubs/` + this.props.match.params.clubId)
      .then(profile => this.setState({ profile: profile.data }));
  }
  joinClub() {
    axios.post(`/clubs/` + this.props.match.params.clubId)
      .then(res => alert(`You joined ${this.state.profile.name}`));
  }
  render() {
    return (
      <div className="contents">
        <Image src={this.state.profile.imageUrl} circle />
        <p>{this.state.profile.name}</p>
        <Button onClick={this.joinClub}>Join club</Button>
      </div>
    );
  }
}

export default ClubProfile;
