import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  HelpBlock,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'

class JoinModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currEvent: props.currEvent
    }
  }

  cancelJoin () {
    this.props.cancelJoin()
  }
  saveJoin () {
    this.props.saveJoin()
  }

  render () {
    return (
      <div>
        <Modal.Header>
          <Modal.Title>Join Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>Organizer: {this.state.currEvent.organizer}</Modal.Title>
          <Modal.Title>Description: {this.state.currEvent.desc}</Modal.Title>
          <Modal.Title>Leaving from: {this.state.currEvent.origin}</Modal.Title>
          <Modal.Title>Destination: {this.state.currEvent.destination}</Modal.Title>
          <Modal.Title>Free Seats: {this.state.currEvent.freeSeats}</Modal.Title>
          <Modal.Title>Start Time: {this.state.currEvent.start.toLocaleString()}</Modal.Title>
          <Modal.Title>End Time: {this.state.currEvent.end.toLocaleString()}</Modal.Title>
          <Modal.Title>Other Riders:</Modal.Title>
          <ListGroup>
            {this.state.currEvent.riders.map((rider, index) => {
              return <ListGroupItem key={index}>{rider}</ListGroupItem>
            })}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.cancelJoin.bind(this)}>Cancel</Button>
          <Button onClick={this.saveJoin.bind(this)}>Join</Button>
          <HelpBlock />
        </Modal.Footer>
      </div>
    )
  }
}

JoinModal.propTypes = {
  cancelJoin: PropTypes.func.isRequired,
  saveJoin: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  })
}

export default JoinModal