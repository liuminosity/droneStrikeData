var React = require('react');
var Modal = require('react-bootstrap').Modal;
var ChartistGraph = require ('react-chartist');
// var Button = require('react-bootstrap').Button;

var MapModal = React.createClass({

  strikeSummary: function strikeSummary() {
    return this.props.strikes[this.props.selectedStrike].bij_summary_short ? 
      <div> {this.props.strikes[this.props.selectedStrike].bij_summary_short} </div> :
      <div> [No summary found for this strike] </div>;
  },

  render: function render() {

    var data = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      series: [
        [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
      ]
    };

    var options = {
      high: 10,
      low: -10,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 2 === 0 ? value : null;
        }
      }
    };

    var type = 'Bar'

    console.log('sup', this.props.selectedStrike);
    return (
      <div>  
        <Modal show={this.props.showModal} onHide={this.props.closeModal} backdrop={true} bsSize={'large'}>
          <Modal.Header closeButton>
            <Modal.Title style={{'marginLeft':'auto', 'marginRight':'auto', 'width':'400px', 'textAlign':'center'}}>Data about this drone strike</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.strikeSummary() }
            <ChartistGraph data={data} options={options} type={type} />
          
          </Modal.Body>
        </Modal>
      </div>
    );
  }
})

module.exports = MapModal;
