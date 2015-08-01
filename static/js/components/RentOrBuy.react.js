var React = require('react');

var RentOrBuy = React.createClass({
  getInitialState: function() {
    return {
      buy: true
    };
  },
  updateRentOrBuy: function(buy) {
    // if the one clicked was already selected, do nothing, otherwise swap them
    if (buy !== this.state.buy) {
      this.setState({
        buy: buy
      });
    }
  },
  render: function() {
    return (
      <ul className='rent_or_buy'>
        <li>
          <a className={this.state.buy ? 'active': ''} onClick={this.updateRentOrBuy.bind(this, true)}>Buy</a>
        </li>
        <li>
          <a className={this.state.buy ? '': 'active'} onClick={this.updateRentOrBuy.bind(this, false)}>Rent</a>
        </li>
      </ul>
    );
  }
});

module.exports = RentOrBuy;
