import React from 'react';
import axios from 'axios';
import {
  Image,
  Button,
  Modal,
} from 'react-bootstrap';
import ClubWaiver from './ClubWaiver';

class Clubs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
      profile: {},
      clubModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createClub = this.createClub.bind(this);
  }
  componentWillMount() {
    axios.get('/clubs')
      .then(res => this.setState({ clubs: res.data }));
    axios.get('/userInfo')
      .then(profile => this.setState({ profile: profile.data }));
  }

  openModal() {
    this.setState({ clubModal: true });
  }
  closeModal() {
    this.setState({ clubModal: false });
  }
  createClub(info) {
    console.log(info);
    this.setState({ clubModal: false });
    axios.post('/clubs', info);
  }
  render() {
    return (
      <div className="contents">
        <Modal show={this.state.clubModal}>
          <ClubWaiver closeModal={this.closeModal} createClub={this.createClub} />
        </Modal>
        <h3>Clubs</h3>
        {
          this.state.profile.admin ?
            <Button
              onClick={this.openModal}
              bsStyle="primary"
              bsSize="large"
            >Create Club +</Button> :
            <div />
        }
        {
          this.state.clubs.map(club => (
            <div key={club._id}>
              <Image src={club.imageUrl} />
              <Button href={`#/clubs/${club._id}`}>{club.name}</Button>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Clubs;
