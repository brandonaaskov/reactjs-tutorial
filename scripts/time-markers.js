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
      <li className="time-marker">
        <div className="hour">
          <span className="time">
            <strong>{this.get('hour')}:00</strong> {meridian}
          </span>
          <span className="half">{this.get('hour')}:30</span>
        </div>
      </li>
    )
  }
})
