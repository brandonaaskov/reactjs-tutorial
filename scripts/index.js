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