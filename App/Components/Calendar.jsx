import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import myEventsList from '../../Library/events'
import {Modal} from 'react-bootstrap'
import TripModal from './TripModal'
import JoinModal from './JoinModal'
import EditModal from './EditModal'
import RiderModal from './RiderModal'
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
      showRiderModal: false
    }
  }

  componentWillMount () {
    axios.get('/userInfo')
      .then(profile => this.setState({ profile: profile.data }, () => {
        console.log('profile', profile)
      }))
  }

  handleOnSelectEvent (e) {
    console.log('event', e)
    console.log('profile in handle', this.state.profile)
    this.setState({currEvent: e})
    console.log('this.state', this.state)
    console.log('riders', e.riders)
    if (this.state.profile.name === e.organizer) {
      this.setState({showEditModal: true})
    } else if (e.riders.indexOf(this.state.profile.name) !== -1) {
      this.setState({showRiderModal: true})
    } else {
      this.setState({showJoinModal: true})
    }
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
  saveTrip (information) {
    const newInfo = Object.assign(information,
      {
        profile: this.state.profile,
        timeslotStart: this.state.timeslotStart,
        timeslotEnd: this.state.timeslotEnd
      })

    axios.post('/saveEvent', information)
      .then((res) => {
        if (res.data.success) { // TODO: Make sure that the state of the
          this.setState({ showModal: false })
        }
      })
    this.setState({ showTripModal: false })
  }
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

  deleteTrip (information) {
    console.log('trip deleted')
    this.setState({ showEditModal: false })
  }

  cancelEdit () {
    console.log('edit canceled')
    this.setState({ showEditModal: false })
  }

  saveEdit (information) {
    this.setState({ showEditModal: false })
    console.log('edit saved')
  }

  leaveTrip (information) {
    this.setState({ showRiderModal: false })
    console.log('rider has left trip')
  }

  closeRiderModal (information) {
    this.setState({ showRiderModal: false })
    console.log('rider modal closed')
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
        <Modal show={this.state.showEditModal}>
          <EditModal
            profile={this.state.profile}
            currEvent={this.state.currEvent}
            deleteTrip={this.deleteTrip.bind(this)}
            cancelEdit={this.cancelEdit.bind(this)}
            saveEdit={this.saveEdit.bind(this)}
          />
        </Modal>
        <Modal show={this.state.showRiderModal}>
          <RiderModal
            profile={this.state.profile}
            currEvent={this.state.currEvent}
            leaveTrip={this.leaveTrip.bind(this)}
            closeRiderModal={this.closeRiderModal.bind(this)}
          />
        </Modal>
      </div>
    )
  }
}

export default Calendar
