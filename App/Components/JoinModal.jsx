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
    console.log('props', props)
  }

  cancelJoin () {
    this.props.cancelJoin()
  }

  saveJoin () {
    this.props.saveJoin({
      eventID: this.state.currEvent._id,
      userID: this.props.profile._id
    })
  }

  render () {
    return (
      <div className='trip-modal'>
        <Modal.Header >
          <div className='trip-jumbotron'>
            <Modal.Title>Join Trip - {this.state.currEvent.freeSeats} FREE SEAT(S) </Modal.Title>
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
                <li><a>Origin: {this.state.currEvent.origin}</a></li>
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
        <div className='wrapper_2'>
          <Modal.Title>OTHER RIDERS: </Modal.Title>
          <ListGroup>
            {this.state.currEvent.riders.map((rider, index) => {
              return <ListGroupItem key={index}>{rider}</ListGroupItem>
            })}
          </ListGroup>
        </div>
        </Modal.Body>
        <Modal.Footer>

          <div className=''>
              <ul className='trip-footer-botton'>
              <li><a onClick={this.cancelJoin.bind(this)}>Cancel</a></li>
              <li ><a onClick={this.saveJoin.bind(this)}>Join</a></li>
            </ul>
          </div>
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
