/**
 * @jsx React.DOM
 */

var TimeMarker = React.createClass({
  get: function (prop) {
    return this.props.data[prop]
  },

  render: function (){
    var morning = this.get('morning') === true
    var inclusive = this.get('inclusive') !== false
    var meridian = (morning) ? 'am' : 'pm'
    var hour = this.get('hour')
    var halfHour = (inclusive) ? <span className="half">{hour}:30</span> : ''
    var minutesIn = this.get('minutesIn')

    return (
      <div className="hour" data-minutes-in={minutesIn}>
        <span className="time">
          <strong>{this.get('hour')}:00</strong> {meridian}
        </span>
        {halfHour}
      </div>
    )
  }
})
