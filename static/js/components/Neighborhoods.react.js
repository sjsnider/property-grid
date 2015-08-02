var React = require('react');
var Select = require('react-select');
var _ = require('lodash');
var logChange = function() {
  return;
};
var Neighborhoods = React.createClass({
  contextTypes: {
    saleProperties: React.PropTypes.object.isRequired,
    rentalProperties: React.PropTypes.object.isRequired
  },
  createNeighborhoodList: function() {
    this.properties = this.props.buy ? this.context.saleProperties : this.context.rentalProperties;
    // create the list of neighborhoods to display by looking at the list of appropriate properties (sale or rentals)
    var neighborhoods = _.map(this.properties, function(property) {
      return property.location;
    });
    // get rid of any dupes
    neighborhoods = _.uniq(neighborhoods);
    // create the array of objects that react-select requires, each object needs a value and a label (what is actually displayed)
    // up to you if you want to include something more like an id for each neighborhood in the JSON to use as the value,
    // for now I'm just using the same value for both obviously
    var neighborhoodsObjectsArray = _.map(neighborhoods, function(neighborhood) {
      return {
        'value': neighborhood,
        'label': neighborhood
      };
    });
    return neighborhoodsObjectsArray;
  },
  updateNeighborhoods: function(selection, list) {
    this.props.updateFilteredNeighborhoods(list, this.properties);
  },
  render: function() {
    var neighborhoods = this.createNeighborhoodList();
    var neighborhoodsToFilter = '';
    // set the default values in the multiselect which are the neighborhoods we are filtering by
    // it takes a string with values separated by commas, so adding a comma to the end of all values
    // except the last one
    _.each(this.props.filteredNeighborhoods, function(neighborhood, index) {
      neighborhoodsToFilter += neighborhood.value;
      if (index !== this.props.filteredNeighborhoods.length - 1)
        neighborhoodsToFilter += ',';
    }, this); 
    return (
      <div className='nav' style={{width: '250px', marginLeft: '20px'}}>
        <Select
          options={neighborhoods}
          onChange={this.updateNeighborhoods}
          value={neighborhoodsToFilter}
          multi={true}
          placeholder='Filter by Neighborhood'
        />
      </div>
    );
  }
});

module.exports = Neighborhoods;
