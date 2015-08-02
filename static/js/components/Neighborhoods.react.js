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
    var properties = this.props.buy ? this.context.saleProperties : this.context.rentalProperties;
    // create the list of neighborhoods to display by looking at the list of appropriate properties (sale or rentals)
    var neighborhoods = _.map(properties, function(property) {
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
    
  },
  render: function() {
    var neighborhoods = this.createNeighborhoodList();
    var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
    ];
    return (
      <div className='nav' style={{width: '250px', marginLeft: '20px'}}>
        <Select
          options={neighborhoods}
          onChange={this.updateNeighborhoods}
          multi={true}
          placeholder='Filter by Neighborhood'
        />
      </div>
    );
  }
});

module.exports = Neighborhoods;
