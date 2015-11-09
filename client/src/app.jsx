var React = require('react');
var ReactDOM = require('react-dom');

var LoadingView = require('./components/LoadingView');

var App = React.createClass({

  getInitialState: function getInitialState() {
    return {
      isLoading: true,
      newDataReceived: false,
    }
  },

  componentWillMount: function componentWillMount() {
    var _this = this;
    $.ajax({
      url:'http://api.dronestre.am/data',
      dataType: 'jsonp',
      success: function success(data) {
        console.log('yay', data);
        _this.setState({
          newDataReceived: true,
          allData: data
        })
      }
    })
  },

  completeLoading: function completeLoading() {
    this.setState({
      newDataReceived: false,
      isLoading: false
    })
  },

  LoadingBlock() {
    if (this.state.isLoading) {
      return (
        <LoadingView 
          isLoading={this.state.isLoading} 
          newDataReceived={this.state.newDataReceived}
          completeLoading={this.completeLoading}
          allData={this.state.allData}/>
        )
    } else {
      return (
        <div>
          Yay!
        </div>
        )
    }
  },

  render: function render() {
    return (
      <div>
        { this.LoadingBlock() }
      </div>
      )
  }
});

var element = React.createElement(App);
ReactDOM.render(element, document.querySelector('.container-fluid'));
