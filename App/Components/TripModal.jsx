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
      destinations: DESTINATIONS
    }
  }

  handleNumSeatsChange (numSeats) {
    this.setState({numSeats})
  }

  handleOriginChange (origin) {
    const filteredDestinations = DESTINATIONS.filter(destination => {
      return destination !== origin
    })
    this.setState({origin, destinations: filteredDestinations})
  }

  handleDestinationChange (destination) {
    const filteredOrigins = ORIGINS.filter(origin => {
      return origin !== destination
    })
    this.setState({destination, origins: filteredOrigins})
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
        <script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js' />
        <Modal.Header>
          <div className='trip-jumbotron'>
            <Modal.Title>ORGANIZE TRIP</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
              <ul className='trip-times'>
              <li><a>START: {this.props.timeslotStart}</a></li>
              <li ><a>END: {this.props.timeslotEnd}</a></li>
            </ul>
          </div>
          <div className=''>
            <form>
              <div className='trip-button-seats'>
                <FormGroup controlId='totalSeats'>
                  <ControlLabel>FREE SEATS</ControlLabel>
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

                </FormGroup>
              </div>
              <div className='trip-button-leaving'>
                <div>
                  <FormGroup controlId='origin'>
                    <div className=''>
                      <ControlLabel>  ORIGION  </ControlLabel>
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

                  <div className=''>
                    <FormGroup controlId='destination'>
                      <div className=''>
                        <ControlLabel>DESTINATION</ControlLabel>
                        <DropdownButton
                          title={this.state.destination}
                          id='dropdown'
                          onSelect={(destination) => this.handleDestinationChange(destination)}
                          noCaret
                        >
                          {this.state.destinations.map((location, index) => {
                            return (
                              <MenuItem key={index} eventKey={location}>
                                {location}
                              </MenuItem>)
                          })}
                        </DropdownButton>
                      </div>
                    </FormGroup>
                  </div>
                </div>

              </div>
              <div className='modal_description'>
                <FormGroup controlId='description' bsClass='modal_description'>
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
          </div>



        </Modal.Body>
        <div className='trip-footer'>
          <Modal.Footer>
            <div className=''>
                <ul className='trip-footer-botton'>
                <li><a onClick={this.cancelTrip.bind(this)}>Cancel</a></li>
                <li><a onClick={this.saveTrip.bind(this)}>Save</a></li>
              </ul>
            </div>
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
