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
      <div className='trip-modal'>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <Modal.Header>
          <div className="trip-jumbotron">
            <Modal.Title>JOIN TRIP</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="join-modal">
            <Modal.Title>ORGANIZER
              <div className="join-box">
                {this.state.currEvent.organizer}
              </div>
            </Modal.Title>
            <Modal.Title>DESCRIPTION
              <div className="join-box">
                {this.state.currEvent.desc}
              </div>
            </Modal.Title>
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
          <div className="join-modal">
            <Modal.Title>START TIME
              <div className="join-box">
                {this.state.currEvent.start.toLocaleString()}
              </div>
            </Modal.Title>
            <Modal.Title>END TIME
              <div className="join-box">
                {this.state.currEvent.end.toLocaleString()}
              </div>
            </Modal.Title>
          </div>
          <div className="join-modal">
            <Modal.Title>Free Seats: {this.state.currEvent.freeSeats}</Modal.Title>
            <Modal.Title>Other Riders:</Modal.Title>
            <ListGroup>
              {this.state.currEvent.riders.map((rider, index) => {
                return <ListGroupItem key={index}>{rider}</ListGroupItem>
              })}
            </ListGroup>
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
