var React = require('react');
var FilterBar = require('../components/FilterBar.react');
var Listings = require('../components/Listings.react');

var PropertyView = React.createClass({
  contextTypes: {
    saleProperties: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      listings: this.context.saleProperties
    };
  },
  updateViewableListings: function(listings) {
    this.setState({
      listings: listings
    });
  },
  render: function() {
    return (
      <div>
        <FilterBar updateViewableListings={this.updateViewableListings} />
        <Listings listings={this.state.listings} />
      </div>
    );
  }
});

module.exports = PropertyView;
