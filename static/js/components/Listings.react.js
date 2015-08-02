var React = require('react');
var Listing = require('../components/Listing.react');
var _ = require('lodash');

var Listings = React.createClass({
  render: function() {
    var rows = _.map(this.props.listings, function(listing, i) {
      return (<Listing listing={listing} key={i} />);
    });
    return (
      <section>
        <div className='container'>
          <div className='row'>
            {rows}
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Listings;
