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

  //Sends the ajax request to the drone strike API
  componentWillMount: function componentWillMount() {
    var _this = this;
    $.ajax({
      url:'http://api.dronestre.am/data',
      dataType: 'jsonp',
      success: function success(data) {
        console.log(data);
        _this.setState({
          newDataReceived: true,
          allData: data
        })
      }
    })
  },

  /**************************************************
  * These are reducer functions that only alter state
  **************************************************/

  //Sets the modal to show, and sets the selected one to index (effectively opening the modal for drone strike with index number "index")
  openModal: function openModal(index) {
    this.setState({
      showModal: true,
      selectedStrike: index
    })
  },

  //closes the modal by setting the showModal state to false
  closeModal: function closeModal() {
    this.setState({
      showModal: false
    })
  },

  //Completes the loading, called after the images have been loaded.
  completeLoading: function completeLoading() {
    this.setState({
      newDataReceived: false,
      isLoading: false
    })
  },

  //Called upon receiving the server data with distance analysis data (NOT from the drone strike API)
  dataReceived: function dataReceived(data) {
    this.setState({
      chartDataReady: true,
      allData: data
    })
  },

  /**************************************************
  * These are functions that return blocks of XML to be rendered in the App component
  **************************************************/

  //This RoutingBlock renders either the loading page or the homeview. Additional views would probably be added here
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
          dataReceived={this.dataReceived}/>
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
