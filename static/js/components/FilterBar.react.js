var React = require('react');
var RentOrBuy = require('../components/RentOrBuy.react');
var Neighborhoods = require('../components/Neighborhoods.react');
var Views = require('../components/Views.react');

var PropertyView = React.createClass({
  getInitialState: function() {
    // default to buy tab
    return {
      buy: true
    };
  },
  updateRentOrBuy: function(buy) {
    // if the one clicked was already selected, do nothing, otherwise swap them
    if (buy !== this.state.buy) {
      this.setState({
        buy: buy
      });
    }
  },
  render: function() {
    return (
      <div className='property_nav dark_gray'>
        <div className='container'>
          <div className='flex'>
            <div style={{width: '100%'}}>
              <RentOrBuy buy={this.state.buy} updateRentOrBuy={this.updateRentOrBuy} />
              <Neighborhoods buy={this.state.buy} />
              <Views />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PropertyView;
