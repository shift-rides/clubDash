import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import myEventsList from '../../Library/events'
import {Modal, MenuItem, ButtonToolbar, DropdownButton} from 'react-bootstrap'
import TripModal from './TripModal'
import JoinModal from './JoinModal'
import EditModal from './EditModal'
import RiderModal from './RiderModal'
import axios from 'axios'
import {AVAILABLE_NUMBERS, ORIGINS, DESTINATIONS} from '../../Library/const'

BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: null,
      allEvents: myEventsList,
      eventList: myEventsList,
      timeslotStart: '',
      timeslotEnd: '',
      currEvent: {},
      showTripModal: false,
      showJoinModal: false,
      showRiderModal: false,
      originFilter: 'All',
      destinationFilter: 'All',
      freeSeatsFilter: 'All',
      originFilterButton: 'From',
      destinationFilterButton: 'To',
      freeSeatsFilterButton: 'Seats Free'
    }
  }

  componentWillMount () {
    axios.get('/userInfo')
      .then(profile => this.setState({ profile: profile.data }, () => {
    //    console.log('profile', profile)
      }))

    axios.get('/events')
      .then(newEvent => this.setState({b: newEvent.data}, () => {
        newEvent.data.forEach(function (elem) {
          elem.start = new Date(elem['start'])
          elem.end = new Date(elem['end'])
        })
        this.setState({eventList: newEvent.data})
        this.setState({allEvents: newEvent.data})
      }))
  }

  handleOnSelectEvent (e) {
    var organizerName
    axios.get('/userInfo/' + e.organizer)
      .then(profile => {
        organizerName = profile.data.name
        e.organizerName = organizerName
        this.setState({currEvent: e})
        if (this.state.profile.name === organizerName) {
          this.setState({showEditModal: true})
        } else if (e.riders.indexOf(this.state.profile.name) !== -1) {
          this.setState({showRiderModal: true})
        } else {
          this.setState({showJoinModal: true})
        }
      })
  }

  handleOnSelectSlot (e) {
    this.setState({currEvent: e})
    this.setState({
      timeslotStart: e.start.toLocaleString(),
      timeslotEnd: e.end.toLocaleString(),
      timeslotStartMoongose: e.start,
      timeslotEndMoongose: e.end,
      showTripModal: true})
  }

  cancelTrip (information) {
    this.setState({ showTripModal: false })
  }

  saveTrip (information) {
    const newInfo = Object.assign(information,
      {
        profile: this.state.profile,
        timeslotStart: this.state.timeslotStart,
        timeslotEnd: this.state.timeslotEnd
      })

    axios.post('/saveEvent', newInfo)
      .then((res) => {
        if (res.data.success) { // TODO: Make sure that the state of the
          this.setState({ showModal: false })
          axios.get('/events')
            .then(newEvent => this.setState({b: newEvent.data}, () => {
              newEvent.data.forEach(elem => {
                elem.start = new Date(elem['start'])
                elem.end = new Date(elem['end'])
              })
              this.setState({eventList: newEvent.data})
            }))
        }
      })
    this.setState({ showTripModal: false })
  }

  cancelJoin (information) {
    this.setState({ showJoinModal: false })
  }

  saveJoin (information) {
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

  handleOriginFilterSelect (origin) {
    if (origin === 'All') {
      this.state.originFilterButton = 'From'
    } else {
      this.state.originFilterButton = 'From ' + origin
    }
    this.state.originFilter = origin
    this.applyFilters()
  }

  handleDestinationFilterSelect (destination) {
    if (destination === 'All') {
      this.state.destinationFilterButton = 'To'
    } else {
      this.state.destinationFilterButton = 'To ' + destination
    }
    this.state.destinationFilter = destination
    this.applyFilters()
  }

  handleFreeSeatsSelect (freeSeats) {
    if (freeSeats === 'All') {
      this.state.freeSeatsFilterButton = 'Seats Free'
    } else {
      this.state.freeSeatsFilterButton = 'Seats Free: ' + freeSeats
    }
    this.state.freeSeatsFilter = freeSeats
    this.applyFilters()
  }

  applyFilters () {
    let eventList = this.state.allEvents
    eventList = eventList.filter(event => {
      return this.state.originFilter === 'All' || event.origin === this.state.originFilter
    })
    eventList = eventList.filter(event => {
      return this.state.destinationFilter === 'All' || event.destination === this.state.destinationFilter
    })
    eventList = eventList.filter(event => {
      return this.state.freeSeatsFilter === 'All' || event.freeSeats <= parseInt(this.state.freeSeatsFilter)
    })
    this.setState({eventList})
  }

  renderFilterButtons () {
    return (
      <ButtonToolbar style={{display: 'flex', justifyContent: 'center'}}>
        <DropdownButton title={this.state.originFilterButton} key='1' id='from-filter' onSelect={(e) => this.handleOriginFilterSelect(e)}>
          <MenuItem eventKey='All' key='0'>All</MenuItem>
          {ORIGINS.map((origin, index) => {
            return (<MenuItem eventKey={origin} key={index}>{origin}</MenuItem>)
          })}
        </DropdownButton>
        <DropdownButton title={this.state.destinationFilterButton} key='2' id='to-filter' onSelect={(e) => this.handleDestinationFilterSelect(e)}>
          <MenuItem eventKey='All' key='0'>All</MenuItem>
          {DESTINATIONS.map((destination, index) => {
            return (<MenuItem eventKey={destination} key={index}>{destination}</MenuItem>)
          })}
        </DropdownButton>
        <DropdownButton title={this.state.freeSeatsFilterButton} key='3' id='seats-filter' onSelect={(e) => this.handleFreeSeatsSelect(e)}>
          <MenuItem eventKey='All' key='0'>All</MenuItem>
          {AVAILABLE_NUMBERS.map((num, index) => {
            return (<MenuItem eventKey={num} key={index}>{num}</MenuItem>)
          })}
        </DropdownButton>
      </ButtonToolbar>
    )
  }

  render () {
    return (
      <div>
        <div>
          {this.renderFilterButtons()}
        </div>
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
