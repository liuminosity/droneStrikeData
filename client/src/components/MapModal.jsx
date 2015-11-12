var React = require('react');
var Modal = require('react-bootstrap').Modal;
var ChartistGraph = require ('react-chartist');

var MapModal = React.createClass({

  //displays a title if it exists, else doesn't render anything
  strikeTitle: function strikeTitle() {
    return this.props.strikes[this.props.selectedStrike].narrative ? 
      <h1> {this.props.strikes[this.props.selectedStrike].narrative} </h1> :
      <div/>;
  },

  //displays summary about the strike, or returns a "no summary found" message
  strikeSummary: function strikeSummary() {
    return this.props.strikes[this.props.selectedStrike].bij_summary_short ? 
      <div> {this.props.strikes[this.props.selectedStrike].bij_summary_short} </div> :
      <div> [No summary found for this strike] </div>;
  },

  //displays a link if it exists, otherwise doesn't display anything
  linkBlock: function linkBlock() {
    return this.props.strikes[this.props.selectedStrike].bij_link ?
      <a href={this.props.strikes[this.props.selectedStrike].bij_link} target="_blank">Read more here</a> :
      <div> [No external link found for this strike] </div>;
  },

  //renders the chartblock, which if the chart data is ready, displays a chart, otherwise sends off an ajax request to the server and displays a loading gif
  chartBlock: function chartBlock() {
    var _this = this;

    //if chart data is ready, load the data into the chart
    if (this.props.chartDataReady) {
      var data = {
        labels: ['<1000m', '<5000m', '<10000m'],
        series: [
          [this.props.strikes[this.props.selectedStrike].nearbyStrikes.strikesWithin1000m,
          this.props.strikes[this.props.selectedStrike].nearbyStrikes.strikesWithin5000m,
          this.props.strikes[this.props.selectedStrike].nearbyStrikes.strikesWithin10000m]
        ]
      };

      var options = {
        high: Math.max(this.props.strikes[this.props.selectedStrike].nearbyStrikes.strikesWithin10000m, 5),
        low: 0,

        onlyInteger: true,
        height: '200px',
        axisY: {
            onlyInteger: true
          }
      };

      var type = 'Bar'

      return <ChartistGraph 
        data={data} 
        options={options} 
        type={type} />

    //If the data is not ready, get the data. Please keep in mind that actually sending off an ajax request is not necessary at all and in this application, probably overkill.
    //I wanted to do this to 1. allow a server (presumably not the "client's" computer) to process the request asynchronously to allow for a faster UX, and 2. to demonstrate
    //that I can handle async/AJAX requests on the server within React.
    } else if (this.props.showModal) {
      $.ajax({
        url: '/analyzeData',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          strikes: _this.props.strikes,
          selectedStrike: _this.props.selectedStrike
        }),
        success: function success(data) {
          _this.props.dataReceived({strike: data});
        }
      });
      return 
        <div style={{'marginLeft':'auto', 'marginRight':'auto', 'width':'420px'}}>
          <img src="http://www.cuisson.co.uk/templates/cuisson/supersize/slideshow/img/progress.BAK-FOURTH.gif" />
        </div>;
    }
  },

  render: function render() {
    return (
      <div>  
        <Modal show={this.props.showModal} onHide={this.props.closeModal} backdrop={true} bsSize={'large'}>
          <Modal.Header closeButton>
            <Modal.Title style={{'marginLeft':'auto', 'marginRight':'auto', 'width':'400px', 'textAlign':'center'}}>Data about this drone strike</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.strikeTitle() }
            { this.strikeSummary() }
            { this.linkBlock() }
            { this.chartBlock() }
          
          </Modal.Body>
        </Modal>
      </div>
    );
  }
})

module.exports = MapModal;
