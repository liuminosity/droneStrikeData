var React = require('react');

var Map = require('./Map');

var HomeView = React.createClass({

  render: function render() {
    return (
      <Map strikes={this.props.strikes}/>
      )
  }
});

module.exports = HomeView;
