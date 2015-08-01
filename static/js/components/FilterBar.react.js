var React = require('react');
var RentOrBuy = require('../components/RentOrBuy.react');

var PropertyView = React.createClass({
  render: function() {
    return (
      <div className='property_nav dark_gray'>
        <div className='container'>
          <div className='flex'>
            <div>
              <RentOrBuy />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PropertyView;
