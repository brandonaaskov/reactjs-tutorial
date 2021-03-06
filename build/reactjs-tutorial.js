/**
 * @jsx React.DOM
 */

var CalendarEvent = React.createClass({displayName: 'CalendarEvent',
  render: function (){
    return (
      React.DOM.div({className: "event"}, 
        React.DOM.h2({className: "name"}, "Sample Item"), 
        React.DOM.h3({className: "location"}, "Sample Location")
      )
    )
  }
})

$(document).ready(function () {
  var day = []
  var $timeMarkers = $('#time-markers')
  var $eventsContainer = $('#events-container')

  var getCalendarDay = function (callback) {
    return $.get('mock/day.json').done(callback)
  }

  var createTimeMarkers = function (response) {
    $(response.day).each(function (index, hour) {
      hour.minutesIn = index * 60 // our inputs are in minutes, so this helps
      day.push(hour)

      $listItem = $('<li></li>')
      $timeMarkers.append($listItem)
      React.renderComponent(TimeMarker({data: hour}), $listItem.get(0))
    })
  }

  var layOutDay = function (events) {
    var hourHeight = $('.hour').height()
    var minuteHeight = hourHeight/60

    $(events).each(function (index, event) {
      $listItem = $('<li></li>')
      timeInPixels = (event.end - event.start) * minuteHeight

      $eventsContainer.append($listItem)
      React.renderComponent(CalendarEvent({data: event}), $listItem.get(0))
      $listItem.height(timeInPixels)
      $listItem.css('top', event.start * minuteHeight)
    })
  }

  // this is just for testing
  var _simulate = function (timeout) {
    timeout = timeout || 150
    var events = [
      {start: 30, end: 150},
      {start: 540, end: 600},
      {start: 560, end: 620},
      {start: 610, end: 670}
    ]

    setTimeout(function () {
      window.layOutDay(events)
    }, timeout)
  }

  // just named for readability
  var initialize = function () {
    getCalendarDay(createTimeMarkers)
//    _simulate()
  }()

  window.layOutDay = layOutDay // surface the API
})
/**
 * @jsx React.DOM
 */

var TimeMarker = React.createClass({displayName: 'TimeMarker',
  get: function (prop) {
    return this.props.data[prop]
  },

  render: function (){
    var morning = this.get('morning') === true
    var inclusive = this.get('inclusive') !== false
    var meridian = (morning) ? 'am' : 'pm'
    var hour = this.get('hour')
    var halfHour = (inclusive) ? React.DOM.span({className: "half"}, hour, ":30") : ''
    var minutesIn = this.get('minutesIn')

    return (
      React.DOM.div({className: "hour", 'data-minutes-in': minutesIn}, 
        React.DOM.span({className: "time"}, 
          React.DOM.strong(null, this.get('hour'), ":00"), " ", meridian
        ), 
        halfHour
      )
    )
  }
})
