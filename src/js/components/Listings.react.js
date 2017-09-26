var React = require('react');
var createReactClass = require('create-react-class');
var Listing = require('../components/Listing.react');
var _ = require('lodash');

var Listings = createReactClass({
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
