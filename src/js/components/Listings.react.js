import history from '../history';
var React = require('react');
var createReactClass = require('create-react-class');
var Listing = require('../components/Listing.react');
var _ = require('lodash');

class Listings extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    history.push('/');
    this.props.checkForUrlFilter('');
  }

  render () {
    var rows = _.map(this.props.listings, function(listing, i) {
      return (<Listing listing={listing} key={i} />);
    });
    return (
      <section>
        <div className='container'>
          <div>
            <a onClick={this.handleClick}>{this.props.filteredNeighborhood ? 'View All' : ''}</a>
            {this.props.filteredNeighborhood ? this.props.filteredNeighborhood + ',' : ''} New York City
          </div>
          <div className='row'>
            {rows}
          </div>
        </div>
      </section>
    );
  }
};

export default Listings;
