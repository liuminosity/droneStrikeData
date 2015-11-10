var React = require('react');

var Map = require('./Map');
var MapModal = require('./MapModal');

var HomeView = React.createClass({

  render: function render() {
    return (
      <div>
        <Map 
          strikes={this.props.strikes}
          openModal={this.props.openModal}/>
        <MapModal 
          strikes={this.props.strikes}
          closeModal={this.props.closeModal}
          showModal={this.props.showModal}
          selectedStrike={this.props.selectedStrike}/>
      </div>
      )
  }
});

module.exports = HomeView;
