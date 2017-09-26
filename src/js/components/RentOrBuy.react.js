var React = require('react');
var createReactClass = require('create-react-class');

var RentOrBuy = createReactClass({
  updateRentOrBuy: function(buy) {
    this.props.updateRentOrBuy(buy);
  },
  render: function() {
    return (
      <ul className='rent_or_buy'>
        <li>
          <a className={this.props.buy ? 'active': ''} onClick={this.updateRentOrBuy.bind(this, true)}>Buy</a>
        </li>
        <li>
          <a className={this.props.buy ? '': 'active'} onClick={this.updateRentOrBuy.bind(this, false)}>Rent</a>
        </li>
      </ul>
    );
  }
});

module.exports = RentOrBuy;
