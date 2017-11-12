import React from 'react'
import PropTypes from 'prop-types'
import {AVAILABLE_NUMBERS} from '../../Library/const'

import {
  Modal,
  Button,
  HelpBlock,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'

class RiderModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currEvent: props.currEvent,
      numSeats: String(props.currEvent.freeSeats),
      availableNumbers: AVAILABLE_NUMBERS
    }
  }

  leaveTrip () {
    this.props.leaveTrip()
  }

  closeRiderModal () {
    this.props.closeRiderModal()
  }

  render () {
    return (
      <div className='join-modal'>
        <Modal.Header>
          <div className="trip-jumbotron">
            <Modal.Title>{this.state.currEvent.organizer}'s Trip</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="join-seats">
              <Modal.Title>{this.state.currEvent.freeSeats} FREE SEAT(S)</Modal.Title>
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
          <ListGroup>
            {this.state.currEvent.riders.map((rider, index) => {
              if (rider === this.props.profile.name) {
                return <ListGroupItem key={index}>{rider}<Button onClick={this.leaveTrip.bind(this)}>Click to Leave Trip</Button></ListGroupItem>
              } else {
                return <ListGroupItem key={index}>{rider}</ListGroupItem>
              }
            })}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeRiderModal.bind(this)}>Done</Button>
          <HelpBlock />
        </Modal.Footer>
      </div>
    )
  }
}

RiderModal.propTypes = {
  leaveTrip: PropTypes.func.isRequired,
  closeRiderModal: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  })
}

export default RiderModal
