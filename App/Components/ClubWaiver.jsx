import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Image,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
} from 'react-bootstrap';

class ClubWaiver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      name: '',
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  handleImageChange(e) {
    this.setState({ image: e.target.value });
  }

  render() {
    return (
      <div>
        <Modal.Header><Modal.Title>New Club</Modal.Title></Modal.Header>
        <Modal.Body>
          <FormGroup controlId="name">
            <ControlLabel>Club Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.name}
              placeholder="Enter Club Name"
              onChange={e => this.setState({ name: e.target.value })}
            />
          </FormGroup>
          <FormGroup controlId="image">
            <ControlLabel>Image Url</ControlLabel>
            <FormControl
              type="text"
              value={this.state.image}
              placeholder="Enter image Url"
              onChange={this.handleImageChange}
            />
          </FormGroup>
          <Image src={this.state.image} circle />
          <HelpBlock>The Image should preview here when the url is entered</HelpBlock>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.createClub(this.state)}>Submit</Button>
          <Button onClick={this.props.closeModal}>Cancel</Button>
        </Modal.Footer>
      </div>
    );
  }
}

ClubWaiver.propTypes = {
  createClub: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ClubWaiver;
