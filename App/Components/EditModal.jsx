import React from 'react'
import PropTypes from 'prop-types'
import {AVAILABLE_NUMBERS} from '../../Library/const'

import {
  Modal,
  Button,
  HelpBlock,
  ListGroup,
  ListGroupItem,
  ControlLabel,
  DropdownButton,
  MenuItem,
  FormGroup
} from 'react-bootstrap'

class EditModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currEvent: props.currEvent,
      numSeats: String(props.currEvent.freeSeats),
      availableNumbers: AVAILABLE_NUMBERS
    }
  }

  removeRider () {
    console.log('rider removed')
  }

  handleNumSeatsChange (numSeats) {
    this.setState({numSeats})
  }

  deleteTrip () {
    this.props.deleteTrip()
  }

  cancelEdit () {
    this.props.cancelEdit()
  }

  saveEdit () {
    this.props.saveEdit()
  }

  render () {
    return (
      <div className='edit-modal'>
        <Modal.Header>
          <Modal.Title>Edit Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>Organizer: {this.state.currEvent.organizerName}</Modal.Title>
          <Modal.Title>Description: {this.state.currEvent.desc}</Modal.Title>
          <Modal.Title>Start Time: {this.state.currEvent.start.toLocaleString()}</Modal.Title>
          <Modal.Title>End Time: {this.state.currEvent.end.toLocaleString()}</Modal.Title>
          <Modal.Title>Leaving from: {this.state.currEvent.origin}</Modal.Title>
          <Modal.Title>Destination: {this.state.currEvent.destination}</Modal.Title>
          <form>
            <FormGroup controlId='totalSeats'>
              <ControlLabel>Total Seats Free: </ControlLabel>
              <DropdownButton
                title={this.state.numSeats}
                id='totalSeats-dropdown'
                onSelect={(numSeats) => this.handleNumSeatsChange(numSeats)}
                noCaret
              >
                {this.state.availableNumbers.map((num, index) => {
                  return (
                    <MenuItem eventKey={num} key={index}>
                      {num}
                    </MenuItem>)
                })}
              </DropdownButton>
            </FormGroup>
            <Modal.Title>Other Riders:</Modal.Title>
            <ListGroup>
              {this.state.currEvent.riders.map((rider, index) => {
                return (
                  <ListGroupItem key={index}>
                    <ControlLabel>{rider}</ControlLabel>
                    <Button onClick={this.removeRider.bind(this)}>Remove</Button>
                  </ListGroupItem>)
              })}
            </ListGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.deleteTrip.bind(this)}>Delete</Button>
          <Button onClick={this.cancelEdit.bind(this)}>Cancel</Button>
          <Button onClick={this.saveEdit.bind(this)}>Done</Button>
          <HelpBlock />
        </Modal.Footer>
      </div>
    )
  }
}

EditModal.propTypes = {
  cancelEdit: PropTypes.func.isRequired,
  saveEdit: PropTypes.func.isRequired,
  deleteTrip: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  })
}

export default EditModal
