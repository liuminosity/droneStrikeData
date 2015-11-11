var React = require('react');
var Modal = require('react-bootstrap').Modal;
var ChartistGraph = require ('react-chartist');

var MapModal = React.createClass({

  strikeSummary: function strikeSummary() {
    return this.props.strikes[this.props.selectedStrike].bij_summary_short ? 
      <div> {this.props.strikes[this.props.selectedStrike].bij_summary_short} </div> :
      <div> [No summary found for this strike] </div>;
  },

  chartBlock: function chartBlock() {
    var _this = this;
    

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
      return <div style={{'marginLeft':'auto', 'marginRight':'auto', 'width':'420px'}}><img src="http://www.cuisson.co.uk/templates/cuisson/supersize/slideshow/img/progress.BAK-FOURTH.gif" >  </img></div>;
    }
  },

  render: function render() {

    

    console.log('sup', this.props.selectedStrike);
    return (
      <div>  
        <Modal show={this.props.showModal} onHide={this.props.closeModal} backdrop={true} bsSize={'large'}>
          <Modal.Header closeButton>
            <Modal.Title style={{'marginLeft':'auto', 'marginRight':'auto', 'width':'400px', 'textAlign':'center'}}>Data about this drone strike</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.strikeSummary() }
            { this.chartBlock() }
          
          </Modal.Body>
        </Modal>
      </div>
    );
  }
})

module.exports = MapModal;
