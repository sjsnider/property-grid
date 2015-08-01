var React = require('react');
var FilterBar = require('../components/FilterBar.react');

var PropertyView = React.createClass({
  render: function() {
    return (
      <div>
        <FilterBar />
      </div>
    );
  }
});

module.exports = PropertyView;
