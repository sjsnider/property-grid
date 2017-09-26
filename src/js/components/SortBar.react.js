import  Select from 'react-select';
var React = require('react');
var createReactClass = require('create-react-class');
var Listings = require('../components/Listings.react');
var _ = require('lodash');

var sortOptions = [
  {
    'value': 'price:descend',
    'label': 'Price - Highest to Lowest'
  },  
  {
    'value': 'price:ascend',
    'label': 'Price - Lowest to Highest'
  },  
  {
    'value': 'sqft:descend',
    'label': 'Square Feet - Highest to Lowest'
  },  
  {
    'value': 'sqft:ascend',
    'label': 'Square Feet - Lowest to Highest'
  }
];

var SortBar = createReactClass({
  getInitialState: function() {
    // default to sorting by price, high to low
    return {
      sortValue: 'price:descend'
    };
  },
  sortListings: function() {
    var sortDescriptionArray = this.state.sortValue.split(':');
    var propertyToSortBy = sortDescriptionArray[0];
    var sortDirection = sortDescriptionArray[1];
    // create an array so I can sort it
    var listingsArray = _.map(this.props.listings, function(listing, i) {
      listing.value = i;
      return listing;
    });
    listingsArray.sort(function(a, b) {
      // only offering sort by price and square feet right now, would have to modify this slightly if sorting by
      // a string (title or neighborhood) was supposed to be an option as well
      if (sortDirection === 'ascend')
        return parseInt(a[propertyToSortBy].replace(',', ''), 10) - parseInt(b[propertyToSortBy].replace(',', ''), 10);
      else 
        return parseInt(b[propertyToSortBy].replace(',', ''), 10) - parseInt(a[propertyToSortBy].replace(',', ''), 10);
    });
    return listingsArray;
  },
  updateSort: function(sortValue) {
    this.setState({
      sortValue: sortValue
    });
  },
  render: function() {
    var listings = this.sortListings();
    return (
      <div>
        <div className='property_nav' style={{ backgroundColor: '#FFFFFF', borderBottom: 'solid 1px gray' }}>
          <div style={{width: '250px', marginLeft: '20px'}}>
            <Select
              options={sortOptions}
              onChange={this.updateSort}
              value={this.state.sortValue}
              clearable={false}
            />
          </div>
        </div>
        <Listings listings={listings} />
      </div>
    );
  }
});

export default SortBar;
