var React = require('react');
var RentOrBuy = require('../components/RentOrBuy.react');
var Neighborhoods = require('../components/Neighborhoods.react');
var Views = require('../components/Views.react');

var FilterBar = React.createClass({
  contextTypes: {
    saleProperties: React.PropTypes.object.isRequired,
    rentalProperties: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    // default to buy tab
    return {
      buy: true
    };
  },
  updateRentOrBuy: function(buy) {
    // if the one clicked was already selected, do nothing, otherwise swap them and update the properties shown
    // also clear out the filtered neighborhoods since the list of neighborhoods will probably be different for
    // sales and rentals
    if (buy !== this.state.buy) {
      this.setState({
        buy: buy
      });
      var properties = buy ? this.context.saleProperties : this.context.rentalProperties;
      this.props.updateViewableListings(properties);
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

module.exports = FilterBar;
