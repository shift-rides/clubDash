import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Radio,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
} from 'react-bootstrap';

const insertHyphen = num => num.slice(0, num.length - 1).concat('-', num.slice(num.length - 1, num.length));

class MainWaiver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameVal: this.props.profile.name,
      genderVal: '',
      phoneVal: '',
      yearVal: '',
      gender: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }


  handleNameChange(e) {
    this.setState({ nameVal: e.target.value });
  }
  handleGenderChange(e) {
    this.setState({ genderVal: e.target.value });
  }
  handleYearChange(e) {
    if (!isNaN(e.target.value) && e.target.value.length < 5) {
      this.setState({ yearVal: e.target.value });
    }
  }
  handlePhoneChange(e) {
    let phoneVal = e.target.value;
    const lastChar = phoneVal.slice(phoneVal.length - 1);
    if ((phoneVal.length !== 4 && phoneVal.length !== 8) && isNaN(lastChar)) {
      return;
    }
    if ((phoneVal.length === 4 && phoneVal.length === 8) && (isNaN(lastChar) || lastChar === '-')) {
      return;
    }
    if (phoneVal.length > 12) {
      return;
    }
    if ((phoneVal.length === 4 || phoneVal.length === 8) && phoneVal[phoneVal.length - 1] !== '-') {
      phoneVal = insertHyphen(phoneVal);
    }
    this.setState({ phoneVal });
  }

  submitForm() {
    const information = {
      name: this.state.nameVal,
      year: this.state.yearVal,
      email: this.props.profile.email,
      phone: this.state.phoneVal,
      gender: this.state.gender,
    };
    this.props.closeModal(information);
  }

  render() {
    return (
      <div>
        <Modal.Header>
          <Modal.Title>Join Clubs Waiver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="name">
              <ControlLabel>Full Name</ControlLabel>
              <FormControl
                type="text"
                value={this.state.nameVal}
                placeholder="Enter name"
                onChange={this.handleNameChange}
              />
            </FormGroup>
            <FormGroup controlId="year">
              <ControlLabel>Class Year</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter class year"
                value={this.state.yearVal}
                onChange={this.handleYearChange}
              />
            </FormGroup>
            <FormGroup controlId="email">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="text"
                value={this.props.profile.email}
                placeholder="Enter email"
                readOnly
              />
            </FormGroup>
            <FormGroup controlId="phone">
              <ControlLabel>Phone Number</ControlLabel>
              <FormControl
                type="text"
                value={this.state.phoneVal}
                placeholder="Enter phone number"
                onChange={this.handlePhoneChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Gender</ControlLabel><br />
              <Radio
                onChange={e => this.setState({ gender: e.target.value })}
                value="female"
                name="radioGroup"
                inline
              >
                Female
              </Radio>
              <Radio
                onChange={e => this.setState({ gender: e.target.value })}
                value="male"
                name="radioGroup"
                inline
              >
                Male
              </Radio>
              <Radio
                onChange={e => this.setState({ gender: e.target.value })}
                value={this.state.genderVal || 'self-identify'}
                name="radioGroup"
                inline
              >
                {this.state.genderVal || 'Self-Identify'}
              </Radio>
            </FormGroup>
            <FormControl
              type="text"
              placeholder="Enter other gender"
              value={this.state.genderVal}
              onChange={this.handleGenderChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.submitForm}>Close</Button>
          <HelpBlock>
            Note: Only your email and name will be saved for future use on the site
          </HelpBlock>
        </Modal.Footer>
      </div >
    );
  }
}

MainWaiver.propTypes = {
  closeModal: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default MainWaiver;
