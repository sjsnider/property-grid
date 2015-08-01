var React = require('react');

var Views = React.createClass({
  render: function() {
    return (
      <div style={{float: 'right'}}>
        <ul className='views'>
          <li>
            <a className='active'><i className='fa fa-th-large' />Grid View</a>
          </li>
          <li>
            <a><i className='fa fa-map-marker' />Map View</a>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = Views;
