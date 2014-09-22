/**
 * @jsx React.DOM
 */

$(document).ready(function () {
  $markers = $('#time-markers')
  $.get('mock/day.json', function (response) {
    $(response.day).each(function () {
      React.renderComponent(TimeMarker({data: this}), $markers.get(0))
    })
  })
})
/**
 * @jsx React.DOM
 */

var TimeMarker = React.createClass({
  displayName: 'TimeMarker',

  get: function (prop) {
    return this.props.data[prop]
  },

  render: function (){
    console.log('TimeMarker render()')
    var morning = this.get('morning') === true
    var meridian = (morning) ? 'am' : ''

    return (
      React.DOM.li({className: "time-marker"}, 
        React.DOM.div({className: "hour"}, 
          React.DOM.span({className: "time"}, 
            React.DOM.strong(null, this.get('hour'), ":00"), " ", meridian
          ), 
          React.DOM.span({className: "half"}, this.get('hour'), ":30")
        )
      )
    )
  }
})
