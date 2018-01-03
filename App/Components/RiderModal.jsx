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

  leaveTrip (e) {
    const info = {
      riderId: e,
      eventId: this.state.currEvent._id,
      freeSeats: this.state.currEvent.freeSeats
}
    this.props.leaveTrip(info)
  }

  closeRiderModal () {
    this.props.closeRiderModal()
  }

  render () {
    return (
      <div className='join-modal'>
        <Modal.Header>
          <div className='trip-jumbotron'>
            <Modal.Title>{this.state.currEvent.organizer.name}'s Trip {this.state.currEvent.freeSeats} FREE SEAT(S)</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>

          <div className=''>
              <ul className='trip-times'>
              <li><a>Start Time: {this.state.currEvent.start.toLocaleString()}</a></li>
              <li ><a>End Time: {this.state.currEvent.end.toLocaleString()}</a></li>
            </ul>
          </div>

          <div className="">
            <div className='wrapper'>
                <ul className='trip-times'>
                <li><a>Leaving from: {this.state.currEvent.origin}</a></li>
                <li><a>Destination: {this.state.currEvent.destination}</a></li>
              </ul>
            </div>
          </div>

          <div className='wrapper' style={
            { paddingTop: '15px',
              textAlign: 'left',
              paddingLeft: '15px'}}>
          <Modal.Title>Organizer: {this.state.currEvent.organizer.name}</Modal.Title>
          <Modal.Title>Phone Number: {this.state.currEvent.organizer.phone}</Modal.Title>
        </div>
        <div className='wrapper_2'>
          <Modal.Title>Description: <span style={{color: 'black'}}> {this.state.currEvent.desc} </span>
          </Modal.Title>
        </div>

        <div className='wrapper' style={
          { paddingTop: '15px',
            textAlign: 'left',
            paddingLeft: '15px'}}>
      <Modal.Title>OTHER RIDERS: </Modal.Title>
  </div>

        <div className='wrapper_2'>

          <ListGroup>
            {this.state.currEvent.riders.map((rider, index) => {
              if (rider.name === this.props.profile.name) {
                return <ListGroupItem key={index}> rider {index+1} {rider.name} phone :{rider.phone}
                  <li style={{float: 'right'}}><a onClick={this.leaveTrip.bind(this, rider._id)}>Leave Trip</a></li>
                </ListGroupItem>
                // padding:'2px 10px 2px 10px',  borderRadius:'4px', textShdow:' 0 1px 1px rgba(0, 0, 0, 0.2)', background:'red'
              } else {
                return <ListGroupItem key={index}>{rider.name}</ListGroupItem>
              }
            })}
          </ListGroup>
        </div>
        </Modal.Body>
        <Modal.Footer>

          <div className=''>
              <ul className='trip-footer-botton' >
              <li style={{float: 'right'}}><a onClick={this.closeRiderModal.bind(this)}>Done</a></li>
            </ul>
          </div>
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
