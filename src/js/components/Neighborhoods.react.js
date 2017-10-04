import Select from 'react-select';
import history from '../history';
var React = require('react');
var PropTypes = require('prop-types');
var _ = require('lodash');

class Neighborhoods extends React.Component {
  constructor(props) {
    super(props);
    this.createNeighborhoodList = this.createNeighborhoodList.bind(this);
    this.updateNeighborhoods = this.updateNeighborhoods.bind(this);
  }
  
  componentDidMount() {
    this.props.checkForUrlFilter();
  }

  createNeighborhoodList () {
    this.properties = this.props.buy ? this.context.saleProperties : this.context.rentalProperties;
    // create the list of neighborhoods to display by looking at the list of appropriate properties (sale or rentals)
    var neighborhoods = _.map(this.properties, function(property) {
      return property.property_location;
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
  }

  updateNeighborhoods (selection) {
    var neighborhoodURL;
    if (!selection) {
      neighborhoodURL = '';
    } else {
      neighborhoodURL = selection.value.split(' ').join('-').toLowerCase();
    }
    history.push(`/${neighborhoodURL}`);
    this.props.checkForUrlFilter(neighborhoodURL);
  }

  render () {
    var neighborhoods = this.createNeighborhoodList();
    var neighborhoodsToFilter = this.props.filteredNeighborhoods;

    return (
      <div className='nav' style={{width: '250px', marginLeft: '20px'}}>
        <Select
          options={neighborhoods}
          onChange={this.updateNeighborhoods}
          value={neighborhoodsToFilter}
          backspaceToRemoveMessage=''
          placeholder='Filter by Neighborhood'
        />
      </div>
    );
  }
};

Neighborhoods.contextTypes = {
  saleProperties: PropTypes.object.isRequired,
  rentalProperties: PropTypes.object.isRequired
}

export default Neighborhoods;
