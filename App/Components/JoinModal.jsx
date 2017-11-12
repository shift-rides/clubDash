import React from 'react'
import PropTypes from 'prop-types'
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

class JoinModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      numSeats: '',
      startVal: '',
      endVal: '',
      descriptionVal: '',
      originVal: '',
      destinationVal: '',
      availableNumbers: ['1', '2', '3', '4', '5', '6', '7', '8'],
      origins: ['Brandeis', 'Logan Airport', 'New Jersey', 'New York'],
      destinations: ['Brandeis', 'Logan Airport', 'New Jersey', 'New York']
    }
  }

  handleNumSeatsChange (num) {
    this.setState({numSeats: num})
  }
  handleDescriptionChange (e) {
    this.setState({descriptionVal: e.target.value})
  }

  cancelJoin () {
    this.props.closeModal()
  }
  saveJoin () {
    this.props.closeModal()
  }

  render () {
    return (
      <div>
        <Modal.Header>
          <Modal.Title>Organize Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId='totalSeats'>
              <ControlLabel>Total Seats Free</ControlLabel>
              <DropdownButton
                title={this.state.numSeats}
                id='totalSeats-dropdown'
                onSelect={(e) => this.handleNumSeatsChange(e)}
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
              <DropdownButton title='Origin' pullRight id='split-button-pull-right'>
                {this.state.origins.map((location, index) => {
                  return (<MenuItem key={index}> {location} </MenuItem>)
                })}
              </DropdownButton>
            </FormGroup>

            <FormGroup controlId='destinations'>
              <DropdownButton title='Destination' pullRight id='split-button-pull-right'>
                {this.state.destinations.map((location, index) => {
                  return (<MenuItem key={index}> {location} </MenuItem>)
                })}
              </DropdownButton>
            </FormGroup>

            <FormGroup controlId='description'>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                type='integer'
                placeholder='Enter a description for the trip.'
                value={this.state.yearVal}
                onChange={this.handleYearChange}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.cancelJoin.bind(this)}>Cancel</Button>
          <Button onClick={this.saveJoin.bind(this)}>Close</Button>
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
