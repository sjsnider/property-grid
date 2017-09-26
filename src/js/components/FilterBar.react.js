import Neighborhoods from '../components/Neighborhoods.react';
import SortBar from '../components/SortBar.react';
var React = require('react');
var PropTypes = require('prop-types');
var RentOrBuy = require('../components/RentOrBuy.react');
var Views = require('../components/Views.react');
var _ = require('lodash');

class FilterBar extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      buy: true,
      filteredNeighborhoods: [],
      listings: context.saleProperties
    }
    this.updateViewableListings = this.updateViewableListings.bind(this);
    this.updateRentOrBuy = this.updateRentOrBuy.bind(this);
    this.updateFilteredNeighborhoods = this.updateFilteredNeighborhoods.bind(this);
  }

  updateViewableListings (listings, filteredNeighborhoods) {
    // default to buy tab, no filters, and sale Properties
    this.setState({
      listings: listings,
      filteredNeighborhoods: filteredNeighborhoods
    });
  }

  updateRentOrBuy (buy) {
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
  }

  updateFilteredNeighborhoods (list, properties) {
    // get properties with the selected neighborhoods
    var viewableProperties = _.filter(properties, function(property) {
      var contains = list.length === 0 ? true : false;
      _.each(list, function(neighborhood) {
          if (neighborhood.value === property.property_location)
            contains = true;
      });
      return contains;
    });
    this.updateViewableListings(viewableProperties, list);
  }

  render () {
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
        <div>
          <SortBar listings={this.state.listings} />
        </div>
      </div>
    );
  }
};

FilterBar.contextTypes = {
  saleProperties: PropTypes.object.isRequired,
  rentalProperties: PropTypes.object.isRequired
}

export default FilterBar;
