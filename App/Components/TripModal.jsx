import React from 'react'
import PropTypes from 'prop-types'
import {AVAILABLE_NUMBERS, ORIGINS, DESTINATIONS} from '../../Library/const'
import {
  Modal,
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
  DropdownButton,
  MenuItem
} from 'react-bootstrap'

class TripModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      numSeats: 'Select',
      origin: 'Select',
      destination: 'Select',
      desc: '',
      availableNumbers: AVAILABLE_NUMBERS,
      origins: ORIGINS,
      allOrigins: ORIGINS,
      destinations: DESTINATIONS,
      allDestinations: DESTINATIONS
    }
  }

  handleNumSeatsChange (numSeats) {
    this.setState({numSeats})
  }

  handleOriginChange (origin) {
    this.setState({origin})
  }

  handleDestinationChange (destination) {
    this.setState({destination})
  }

  handleDescriptionChange (e) {
    this.setState({desc: e.target.value})
  }

  cancelTrip () {
    this.props.cancelTrip()
  }

  saveTrip () {
    const information = {
      numSeats: this.state.numSeats,
      origin: this.state.origin,
      destination: this.state.destination,
      desc: this.state.desc
    }
    this.props.saveTrip(information)
  }

  render () {
    return (
      <div className='trip-modal'>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <Modal.Header>
          <div className="trip-jumbotron">
            <Modal.Title>ORGANIZE TRIP</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="trip-times">
              <Modal.Title>START: {this.props.timeslotStart}</Modal.Title>
              <Modal.Title>END: {this.props.timeslotEnd}</Modal.Title>
            </div>
          </div>
          <div className="row">
            <form>
              <div className="trip-button">
                <FormGroup controlId='totalSeats'>
                  <ControlLabel>TOTAL FREE SEATS</ControlLabel>
                    <div className="row">
                      <DropdownButton
                        title={this.state.numSeats}
                        id='dropdown'
                        onSelect={(num) => this.handleNumSeatsChange(num)}
                        noCaret
                      >
                        {this.state.availableNumbers.map((num, index) => {
                          return (
                            <MenuItem eventKey={num} key={index}>
                              {num}
                            </MenuItem>)
                        })}
                      </DropdownButton>
                    </div>
                </FormGroup>
              </div>
              <div className="trip-button">
                <FormGroup controlId='origin'>
                  <ControlLabel>LEAVING FROM</ControlLabel>
                    <div className="row">
                      <DropdownButton
                        title={this.state.origin}
                        id='dropdown'
                        onSelect={(origin) => this.handleOriginChange(origin)}
                        noCaret
                      >
                        {this.state.origins.map((location, index) => {
                          return (
                            <MenuItem key={index} eventKey={location}>
                              {location}
                            </MenuItem>)
                        })}
                      </DropdownButton>
                    </div>
                </FormGroup>
              </div>
              <div className="trip-button">
                <FormGroup controlId='destination'>
                  <ControlLabel>DESTINATION</ControlLabel>
                    <div className="row">
                      <DropdownButton
                        title={this.state.destination}
                        id='dropdown'
                        onSelect={(destination) => this.handleDestinationChange(destination)}
                        noCaret
                      >
                        {this.state.origins.map((location, index) => {
                          return (
                            <MenuItem key={index} eventKey={location}>
                              {location}
                            </MenuItem>)
                        })}
                      </DropdownButton>
                    </div>
                </FormGroup>
              </div>
            </form>
          </div>
          <form>
            <div className="trip-button">
              <FormGroup controlId='description'>
                <ControlLabel>DESCRIPTION</ControlLabel>
                <FormControl
                  type='string'
                  placeholder='Enter a description for the trip.'
                  value={this.state.description}
                  onChange={this.handleDescriptionChange.bind(this)}
                />
              </FormGroup>
            </div>
          </form>
        </Modal.Body>
        <div className="trip-footer">
          <Modal.Footer>
            <Button onClick={this.cancelTrip.bind(this)}>Cancel</Button>
            <Button onClick={this.saveTrip.bind(this)}>Save</Button>
            <HelpBlock />
          </Modal.Footer>
        </div>
      </div>
    )
  }
}

TripModal.propTypes = {
  cancelTrip: PropTypes.func.isRequired,
  saveTrip: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  })
}

export default TripModal
