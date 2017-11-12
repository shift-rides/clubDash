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

  removeRider (e,b,c) {
    const info = {riderId: e, eventId: this.state.currEvent._id }
    this.props.removeRider(info);
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
          <div className="trip-jumbotron">
            <Modal.Title>EDIT TRIP</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="join-seats">
              <Modal.Title>TOTAL FREE SEATS
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
              </Modal.Title>
            </div>
            <div className="trip-times">
              <Modal.Title>START: {this.state.currEvent.start.toLocaleString()}</Modal.Title>
              <Modal.Title>END: {this.state.currEvent.end.toLocaleString()}</Modal.Title>
            </div>
          </div>
          <div className="row">
            <div className="join-modal">
              <Modal.Title>ORGANIZER
                <div className="join-box">
                  {this.state.currEvent.organizer}
                </div>
              </Modal.Title>
              <Modal.Title>OTHER RIDERS</Modal.Title>
              <ListGroup>
                {this.state.currEvent.riders.map((rider, index) => {
                  return <ListGroupItem key={index}>{rider}</ListGroupItem>
                })}
              </ListGroup>
            </div>
            <div className="join-modal">
              <Modal.Title>LEAVING FROM
                <div className="join-box">
                  {this.state.currEvent.origin}
                </div>
              </Modal.Title>
              <Modal.Title>DESTINATION
                <div className="join-box">
                  {this.state.currEvent.destination}
                </div>
              </Modal.Title>
            </div>
          </div>
          <div className="join-modal">
            <Modal.Title>DESCRIPTION
              <div className="join-box">
                {this.state.currEvent.desc}
              </div>
            </Modal.Title>
          </div>
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
