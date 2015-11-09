var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({

  render: function render() {
    return (
      <div>
        hello world
      </div>
      )
  }
});

var element = React.createElement(App);
ReactDOM.render(element, document.querySelector('.container-fluid'));
