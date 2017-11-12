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
      description: '',
      availableNumbers: AVAILABLE_NUMBERS,
      origins: ORIGINS,
      destinations: DESTINATIONS
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
    this.setState({description: e.target.value})
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
      <div>
        <Modal.Header>
          <Modal.Title>Organize Trip</Modal.Title>
          <Modal.Title>Start: {this.props.timeslotStart}</Modal.Title>
          <Modal.Title>End: {this.props.timeslotEnd}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId='totalSeats'>
              <ControlLabel>Total Seats Free:  </ControlLabel>
              <DropdownButton
                title={this.state.numSeats}
                id='totalSeats-dropdown'
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
            </FormGroup>

            <FormGroup controlId='origin'>
              <ControlLabel>Leaving From:  </ControlLabel>
              <DropdownButton
                title={this.state.origin}
                id='origin-dropdown'
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
            </FormGroup>

            <FormGroup controlId='destination'>
              <ControlLabel>Destination:  </ControlLabel>
              <DropdownButton
                title={this.state.destination}
                id='destination-dropdown'
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
            </FormGroup>

            <FormGroup controlId='description'>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                type='integer'
                placeholder='Enter a description for the trip.'
                value={this.state.description}
                onChange={this.handleDescriptionChange.bind(this)}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.cancelTrip.bind(this)}>Cancel</Button>
          <Button onClick={this.saveTrip.bind(this)}>Save</Button>
          <HelpBlock />
        </Modal.Footer>
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
