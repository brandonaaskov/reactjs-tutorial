$(document).ready(function () {
  var day = []

  var createTimeMarkers = function (callback) {
    var $timeMarkers = $('#time-markers')

    $.get('mock/day.json', function (response) {
      $(response.day).each(function (index, hour) {
        // we have to create this li here because React overwrites the contents
        // of the container
        $listItem = $('<li></li>')
        $timeMarkers.append($listItem)

        hour.minutesIn = index * 60 // our inputs are in minutes, so this helps
        day.push(hour)

        React.renderComponent(TimeMarker({data: hour}), $listItem.get(0))
        callback()
      })
    })
  }

  var layOutDay = function (events) {
    // TODO determine heights based on how tall an hour is - break down into 5 or 10 minute increments
  }

  createTimeMarkers(function () {
    var events = [ //TODO remove this
      {start: 30, end: 150},
      {start: 540, end: 600},
      {start: 560, end: 620},
      {start: 610, end: 670}
    ]

    layOutDay(events)
  })

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
