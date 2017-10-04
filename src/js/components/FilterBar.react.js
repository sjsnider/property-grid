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
      filteredNeighborhoods: '',
      listings: context.saleProperties
    }

    this.checkForUrlFilter = this.checkForUrlFilter.bind(this);
    this.updateViewableListings = this.updateViewableListings.bind(this);
    this.updateRentOrBuy = this.updateRentOrBuy.bind(this);
    this.updateFilteredNeighborhoods = this.updateFilteredNeighborhoods.bind(this);
  }

  checkForUrlFilter(neighborhood) {
    this.properties = this.state.buy ? this.context.saleProperties : this.context.rentalProperties;
    neighborhood = this.neighborhood ? neighborhood : this.context.neighborhood;
    // filter based on url path

    if (this.neighborhood !== neighborhood) {
      var data;
      if (neighborhood) {
        const nameArray = neighborhood.split('-');
        const nameArrayCaps = nameArray.map(w => {
          return w.charAt(0).toUpperCase() + w.slice(1);
        });
        data = { value: nameArrayCaps.join(' ') };
      }
      
      this.updateFilteredNeighborhoods(data, this.properties);
      
    }

    this.neighborhood = neighborhood || 'placeholder';

  }

  updateViewableListings (listings, filteredNeighborhoods) {
    // default to buy tab, no filters, and sale Properties
    this.setState({
      listings: listings,
      filteredNeighborhoods: filteredNeighborhoods ? filteredNeighborhoods.value : ''
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
      var data;
      if (this.neighborhood) {
        const nameArray = this.neighborhood.split('-');
        const nameArrayCaps = nameArray.map(w => {
          return w.charAt(0).toUpperCase() + w.slice(1);
        });
        data = { value: nameArrayCaps.join(' ') };
      }
      
      this.updateFilteredNeighborhoods(data, properties);
    }
  }

  updateFilteredNeighborhoods (selection, properties) {
    // get properties with the selected neighborhoods
    var viewableProperties = _.filter(properties, function(property) {
      if (!selection) return true;
      var contains = selection.value === property.property_location;
      return contains;
    });
    this.updateViewableListings(viewableProperties, selection);
  }

  render () {
    return (
      <div>
        <div className='property_nav dark_gray'>
          <div className='container'>
            <div className='flex'>
              <div style={{width: '100%'}}>
                <RentOrBuy buy={this.state.buy} updateRentOrBuy={this.updateRentOrBuy} />
                <Neighborhoods filteredNeighborhoods={this.state.filteredNeighborhoods} buy={this.state.buy} updateFilteredNeighborhoods={this.updateFilteredNeighborhoods} checkForUrlFilter={this.checkForUrlFilter} />
                <Views />
              </div>
            </div>
          </div>
        </div>
        <div>
          <SortBar listings={this.state.listings} filteredNeighborhood={this.state.filteredNeighborhoods} checkForUrlFilter={this.checkForUrlFilter} />
        </div>
      </div>
    );
  }
};

FilterBar.contextTypes = {
  saleProperties: PropTypes.object.isRequired,
  rentalProperties: PropTypes.object.isRequired,
  neighborhood: PropTypes.string
}

export default FilterBar;
