var React = require('react');
var ReactDOM = require('react-dom');

var LoadingView = require('./components/LoadingView');
var HomeView = require('./components/HomeView');

var App = React.createClass({

  getInitialState: function getInitialState() {
    return {
      isLoading: true,
      newDataReceived: false,
      showModal: false,
      selectedStrike: 0,
      chartDataReady: false
    }
  },

  openModal: function openModal(index) {
    this.setState({
      showModal: true,
      selectedStrike: index
    })
  },

  closeModal: function closeModal() {
    this.setState({
      showModal: false
    })
  },

  updateData: function updateData(data) {
    this.setState({
      allData: data
    })
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

  dataReceived: function dataReceived(data) {
    this.setState({
      chartDataReady: true,
      allData: data
    })
  },

  RoutingBlock() {
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
        <HomeView 
          strikes={this.state.allData.strike}
          openModal={this.openModal}
          closeModal={this.closeModal}
          showModal={this.state.showModal}
          selectedStrike={this.state.selectedStrike}
          chartDataReady={this.state.chartDataReady}
          dataReceived={this.dataReceived}
          updateData={this.updateData}/>
        )
    }
  },

  render: function render() {
    return (
      <div>
        { this.RoutingBlock() }
      </div>
      )
  }
});

var element = React.createElement(App);
ReactDOM.render(element, document.querySelector('.container-fluid'));
