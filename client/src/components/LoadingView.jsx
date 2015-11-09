var React = require('react');

var LoadingView = React.createClass({

  render: function render() {
    if (this.props.isLoading && !this.props.newDataReceived) {
      return (
        <div className = "loading"> 
          <img src="http://49.media.tumblr.com/36353a3dda472893309fca34767d168f/tumblr_n6rb5fevsD1qz7ymyo1_500.gif"/>
          <span>Searching for drone strikes...</span>
          
        </div>
        )
    } else {
      var _this = this;
      setTimeout(function() {
        _this.props.completeLoading();
      }, 1000)
      return (
        <div className="loading">
          <img src="http://49.media.tumblr.com/36353a3dda472893309fca34767d168f/tumblr_n6rb5fevsD1qz7ymyo1_500.gif"/>  
          <span><b>{this.props.allData.strike.length}</b> drone strikes found!</span>
        </div>
      );
    }

  }
})

module.exports = LoadingView;
