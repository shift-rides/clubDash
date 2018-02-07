import React from 'react'
import PropTypes from 'prop-types'
import {AVAILABLE_NUMBERS} from '../../Library/const'
import axios from 'axios'
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

  removeRider (e, b, c) {
    const info = {riderId: e, eventId: this.state.currEvent._id}
    this.props.removeRider(info)
  }

  handleNumSeatsChange (numSeats) {
    this.setState({numSeats})
  }

  deleteTrip () {
    this.props.deleteTrip(this.state.currEvent._id)
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

        <Modal.Header >
          <div className='trip-jumbotron'>
            <Modal.Title>Edit Trip: organizer - {this.state.currEvent.organizer.name} / Phone: {this.state.currEvent.organizer.phone}</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
              <ul className='trip-times'>
              <li><a>Start Time: {this.state.currEvent.start.toLocaleString()}</a></li>
              <li ><a>End Time: {this.state.currEvent.end.toLocaleString()}</a></li>
            </ul>
          </div>
          {/* <div className='wrapper'>
          <Modal.Title>Organizer: {this.state.currEvent.organizer.name}</Modal.Title>
          <Modal.Title>Phone Number: {this.state.currEvent.organizer.phone}</Modal.Title>
        </div> */}

      <div className='wrapper'>
          <ul className='trip-times'>
          <li><a>Origin: {this.state.currEvent.origin}</a></li>
          <li><a>Destination: {this.state.currEvent.destination}</a></li>
        </ul>
      </div>

      <div className='wrapper_2'>
        <Modal.Title>Description: {this.state.currEvent.desc}</Modal.Title>
      </div>

      <div className='wrapper_2'>

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
        </form>
      </div>

      <div className='wrapper_2'>
      <Modal.Title>Other Riders:</Modal.Title>
      <ListGroup>
        {this.state.currEvent.riders.map((rider, index) => {
          return (
            <ListGroupItem key={index}>
              {/* <ControlLabel> rider {index+1} {rider.name} phone :{rider.phone}</ControlLabel> */}
                    rider {index+1} {rider.name} phone :{rider.phone}
              <Button onClick={this.removeRider.bind(this, rider._id)}>Remove</Button>
            </ListGroupItem>)
        })}
      </ListGroup>
    </div>

        </Modal.Body>
        <Modal.Footer>

          <div className=''>
              <ul className='edit-trip-footer-botton'>
              <li ><a onClick={this.cancelEdit.bind(this)}>Cancel</a></li>
              <li><a onClick={this.deleteTrip.bind(this)}>Delete</a></li>
              <li ><a onClick={this.saveEdit.bind(this)}>Done</a></li>
            </ul>
          </div>
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
