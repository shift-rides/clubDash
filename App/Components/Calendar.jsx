/* globals alert */

import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import myEventsList from '../../Library/events'

BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
class Calendar extends React.Component {
  render () {
    return (
      <BigCalendar
        {...this.props}
        events={myEventsList}
        views={['week', 'day']}
        step={60}
        defaultDate={new Date(2015, 3, 1)}
        defaultView='week'
        selectable
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={(slotInfo) => alert(
          `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
          `\nend: ${slotInfo.end.toLocaleString()}` +
          `\naction: ${slotInfo.action}`
        )}
      />
    )
  }
}

export default Calendar
