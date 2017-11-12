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
        <Modal.Header>
          <div className="trip-jumbotron">
            <Modal.Title>JOIN TRIP</Modal.Title>
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
