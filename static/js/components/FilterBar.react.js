var React = require('react');
var RentOrBuy = require('../components/RentOrBuy.react');
var Neighborhoods = require('../components/Neighborhoods.react');
var Views = require('../components/Views.react');
var Listings = require('../components/Listings.react');
var _ = require('lodash');

var FilterBar = React.createClass({
  contextTypes: {
    saleProperties: React.PropTypes.object.isRequired,
    rentalProperties: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    // default to buy tab, no filters, and sale Properties
    return {
      buy: true,
      filteredNeighborhoods: [],
      listings: this.context.saleProperties
    };
  },
  updateViewableListings: function(listings, filteredNeighborhoods) {
    this.setState({
      listings: listings,
      filteredNeighborhoods: filteredNeighborhoods
    });
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
      this.updateViewableListings(properties, []);
    }
  },
  updateFilteredNeighborhoods: function(list, properties) {
    // get properties with the selected neighborhoods
    var viewableProperties = _.filter(properties, function(property) {
      var contains = list.length === 0 ? true : false;
      _.each(list, function(neighborhood) {
          if (neighborhood.value === property.location)
            contains = true;
      });
      return contains;
    });
    this.updateViewableListings(viewableProperties, list);
  },
  render: function() {
    return (
      <div>
        <div className='property_nav dark_gray'>
          <div className='container'>
            <div className='flex'>
              <div style={{width: '100%'}}>
                <RentOrBuy buy={this.state.buy} updateRentOrBuy={this.updateRentOrBuy} />
                <Neighborhoods filteredNeighborhoods={this.state.filteredNeighborhoods} buy={this.state.buy} updateFilteredNeighborhoods={this.updateFilteredNeighborhoods} />
                <Views />
              </div>
            </div>
          </div>
        </div>
        <Listings listings={this.state.listings} />
      </div>
    );
  }
});

module.exports = FilterBar;
