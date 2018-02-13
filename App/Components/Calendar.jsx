import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import myEventsList from '../../Library/events'
import {Modal, MenuItem, ButtonToolbar, DropdownButton, Label} from 'react-bootstrap'
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
      freeSeatsFilterButton: 'Seats Free',
      origins: ORIGINS,
      destinations: DESTINATIONS
    }
  }

  componentWillMount () {
    axios.get('/userInfo')
    .then(profile => this.setState({ profile: profile.data }, () => {}))

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

  // TODO: Refactor

  handleOnSelectEvent (e) {
    console.log("this is the info of the event", e)
    this.setState({currEvent: e}, () => {
      var showRider = false
      if (this.state.profile.name === e.organizer.name) {
        this.setState({showEditModal: true})
      } else {
        e.riders.forEach(rider => {
          if (rider._id === this.state.profile._id) {
            showRider = true
          }
        })
        if (showRider) {
          this.setState({showRiderModal: true})
        } else {
          this.setState({showJoinModal: true})
        }
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
      if (res.data.success) {
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
    console.log("info", information)
    axios.post('/joinEvent', information)
    .then(res => {
          console.log("result is ", res);
      if (res.data.success) {
        axios.get('/events')
          .then(newEvent => this.setState({b: newEvent.data}, () => {
            newEvent.data.forEach(elem => {
              elem.start = new Date(elem['start'])
              elem.end = new Date(elem['end'])
              console.log('new event for test, ', newEvent.data)

            })
            this.setState({eventList: newEvent.data})
          }))
      }
      console.log("nothing happend2")
      this.setState({ showJoinModal: false })
    })

  }

  deleteTrip (information) {
    // console.log('info',information);

    axios.post('/removeEvent', {id: information })
    .then((res) => {
      if (res.data.success) {
          this.setState({ showEditModal: false })

        let newEvents = this.state.eventList.filter(event =>  event._id !== information)

          this.setState({eventList: newEvents})
          this.setState({allEvents: newEvents})
        }
      })
  }

  cancelEdit () {
    this.setState({ showEditModal: false })
  }

  saveEdit (information) {
    this.setState({ showEditModal: false })
  }

  removeRider (information) {
    axios.post('/removeUserFromEvent', information)
    .then((res) => {
      if (res.data.success) {
        axios.get('/eventInfo/' + this.state.currEvent._id).then(event => {
          this.setState({currEvent: event.data})
          this.setState({ showEditModal: false })
        })
      }
    })
  }

  leaveTrip (information) {
    axios.post('/removeUserFromEvent', information)
    .then((res) => {
      if (res.data.success) {
        this.state.eventList.forEach((item)=>{
          if(item._id === information.eventId){
            const index = item.riders.indexOf(information.riderId);
            item.riders.splice(index, 1);
            console.log('each item', item)
            item.freeSeats = item.freeSeats + 1;
          }

        })
        this.setState({ showRiderModal: false })
      }
    })
  }

  closeRiderModal (information) {
    this.setState({ showRiderModal: false })
  }

  handleOriginFilterSelect (origin) {
    if (origin === 'All') {
      this.setState({
        originFilterButton: 'From',
        origins: ORIGINS
      })
    } else {
      const filteredDestinations = DESTINATIONS.filter(destination => {
        return destination !== origin
      })
      this.setState({
        originFilterButton: 'From ' + origin,
        destinations: filteredDestinations
      })
    }
    this.setState({originFilter: origin}, () => {
      this.applyFilters()
    })
  }

  handleDestinationFilterSelect (destination) {
    if (destination === 'All') {
      this.setState({
        destinationFilterButton: 'To',
        destinations: DESTINATIONS
      })
    } else {
      const filteredOrigins = ORIGINS.filter(origin => {
        return origin !== destination
      })
      this.setState({
        destinationFilterButton: 'To ' + destination,
        origins: filteredOrigins
      })
    }
    this.setState({destinationFilter: destination}, () => {
      this.applyFilters()
    })
  }

  handleFreeSeatsSelect (freeSeats) {
    if (freeSeats === 'All') {
      this.setState({freeSeatsFilterButton: 'Seats Free'})
    } else {
      this.setState({freeSeatsFilterButton: 'Seats Free: ' + freeSeats})
    }
    this.setState({freeSeatsFilter: freeSeats}, () => {
      this.applyFilters()
    })
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
      return this.state.freeSeatsFilter === 'All' || event.freeSeats >= parseInt(this.state.freeSeatsFilter)
    })
    this.setState({eventList})
  }

  renderFilterButtons () {
    return (

      <ButtonToolbar style={{display: 'flex', justifyContent: 'center'}}>

        <DropdownButton title={this.state.originFilterButton} key='1' id='from-filter' onSelect={(e) => this.handleOriginFilterSelect(e)}>
          <MenuItem eventKey='All' key='0'>All</MenuItem>
          {this.state.origins.map((origin, index) => {
            return (<MenuItem eventKey={origin} key={index}>{origin}</MenuItem>)
          })}
        </DropdownButton>
        <DropdownButton title={this.state.destinationFilterButton} key='2' id='to-filter' onSelect={(e) => this.handleDestinationFilterSelect(e)}>
          <MenuItem eventKey='All' key='0'>All</MenuItem>
          {this.state.destinations.map((destination, index) => {
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
    var today = new Date()
    return (
      <div>
        <div>

          <div style = {{marginLeft: "10px", fontSize: '14px'}}>
          <Label bsStyle="primary">Free space</Label>{' '}
          <Label bsStyle="warning">No space</Label>{' '}
            <Label bsStyle="danger">You're the organizer</Label>
        </div>
          {this.renderFilterButtons()}
        </div>
        <BigCalendar
          {...this.props}
          events={this.state.eventList}
          views={['week', 'day']}
          step={60}
          defaultDate={new Date(Date.now())}
          min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12)}
          defaultView='week'
          selectable
          onSelectEvent={(e) => this.handleOnSelectEvent(e)}
          onSelectSlot={(slotInfo) => this.handleOnSelectSlot(slotInfo)}
          titleAccessor={(e) => {
            const labelString = e.organizer.name + '\n' + e.origin + ' to\n' + e.destination
            return labelString
          }}
          eventPropGetter={(e) => {
            console.log('this profile', this.state.profile)
            console.log('this event', e)
            if (e.organizer._id === this.state.profile._id) {
              return {className: 'organizerCell'}
            }
            e.riders.forEach(rider => {
              if (rider._id === this.state.profile._id) {
                return {className: 'riderCell'}
              }
            })
            return {}
          }}

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
            removeRider={this.removeRider.bind(this)}
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
