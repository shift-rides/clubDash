/* globals alert */

import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import myEventsList from '../../Library/events'
import {Modal} from 'react-bootstrap'
import TripModal from './TripModal'
import JoinModal from './JoinModal'
import axios from 'axios'

BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: null,
      eventList: myEventsList,
      timeslotStart: '',
      timeslotEnd: '',
      currEvent: {},
      showTripModal: false,
      showJoinModal: false,
      timeslotStartMoongose:null,
      timeslotEndMoongose:null
    }
  }

  componentWillMount () {
    axios.get('/userInfo')
      .then(profile => this.setState({ profile: profile.data }, () => {
    //    console.log('profile', profile)
  }));

  axios.get('/events')
    .then(newEvent => this.setState({b: newEvent.data}, () => {
      newEvent.data.forEach(function(elem) {
      console.log("element is ", elem);
      elem.start = new Date(elem['start']);
      elem.end = new Date(elem['end']);
      console.log('elem is ', elem);
      });
    this.setState({eventList: newEvent.data});
    }));
  }


  handleOnSelectEvent (e) {

var organizerName;
    axios.get('/userInfo/'+e.organizer)
      .then(profile => {
        // this.setState({ profile: profile.data
        // })
        organizerName = profile.data.name;
        //console.log(organizerName);
        this.setState({currEvent: {
          title: e.title,
          allDay: e.allDay,
          start: e.start,
          end: e.end,
          origin: e.origin,
          destination: e.destination,
          freeSeats: e.freeSeats,
          organizer: organizerName,
          riders: e.riders,
          desc: e.desc
        }})
        this.setState({showJoinModal: true})
      });


  }

  handleOnSelectSlot (slotInfo) {
    // alert(
    //   `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
    //   `\nend: ${slotInfo.end.toLocaleString()}` +
    //   `\naction: ${slotInfo.action}`
    // )
    this.setState({
      timeslotStart: slotInfo.start.toLocaleString(),
      timeslotEnd: slotInfo.end.toLocaleString(),
      timeslotStartMoongose:slotInfo.start,
      timeslotEndMoongose:slotInfo.end,
      showTripModal: true})
  }

  cancelTrip (information) {
    // axios.post('/saveEvent', information)
    //   .then((res) => {
    //     if (res.data.success) { // TODO: Make sure the waiver was finsihed
    //       this.setState({ showModal: false })
    //     }
    //   })
    console.log('this', this)
    this.setState({ showTripModal: false })
  }
  //save a new trip
  saveTrip (information) {
    const newInfo= Object.assign(information,
      { profile: this.state.profile,
        timeslotStart: this.state.timeslotStart,
        timeslotEnd: this.state.timeslotEnd,
      });
    console.log("new checking info",newInfo);;
    axios.post('/saveEvent', information)
      .then((res) => {
        if (res.data.success) { // TODO: Make sure that the state of the
          this.setState({ showModal: false })
          axios.get('/events')
            .then(newEvent => this.setState({b: newEvent.data}, () => {
              newEvent.data.forEach(function(elem) {
        console.log("element is ", elem);
        elem.start = new Date(elem['start']);
        elem.end = new Date(elem['end']);
        console.log('elem is ', elem);
        });
        this.setState({eventList: newEvent.data});
         }));
        }
      })
    this.setState({ showTripModal: false })
  }
  // cancel a join modal
  cancelJoin (information) {
    // axios.post('/saveEvent', information)
    //   .then((res) => {
    //     if (res.data.success) { // TODO: Make sure the waiver was finsihed
    //       this.setState({ showModal: false })
    //     }
    //   })
    this.setState({ showJoinModal: false })
  }

  saveJoin (information) {
    // axios.post('/saveEvent', information)
    //   .then((res) => {
    //     if (res.data.success) { // TODO: Make sure the waiver was finsihed
    //       this.setState({ showModal: false })
    //     }
    //   })
    this.setState({ showJoinModal: false })
  }

  render () {
    return (
      <div>
        <BigCalendar
          {...this.props}
          events={this.state.eventList}
          views={['week', 'day']}
          step={60}
          defaultDate={new Date(2015, 3, 1)}
          defaultView='week'
          selectable
          onSelectEvent={(e) => this.handleOnSelectEvent(e)}
          onSelectSlot={(slotInfo) => this.handleOnSelectSlot(slotInfo)}
        />
        <Modal show={this.state.showTripModal}>
          <TripModal
            profile={this.state.profile}
            cancelTrip={this.cancelTrip.bind(this)}
            saveTrip={this.saveTrip.bind(this)}
            timeslotStart={this.state.timeslotStart}
            timeslotEnd={this.state.timeslotEnd}
          />
        </Modal>
        <Modal show={this.state.showJoinModal}>
          <JoinModal
            profile={this.state.profile}
            cancelJoin={this.cancelJoin.bind(this)}
            saveJoin={this.saveJoin.bind(this)}
            currEvent={this.state.currEvent}
          />
        </Modal>
      </div>
    )
  }
}

export default Calendar
