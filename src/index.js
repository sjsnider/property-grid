import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './dist/scss/arrange.css';
import './dist/scss/main.css';
import './dist/scss/styles.css';
import properties from './properties.json';
import FilterBar from './js/components/FilterBar.react';
var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var loadJSON = function(path, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', path, true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState === 4 && xobj.status === "200") {
      callback(JSON.parse(xobj.response));
    }
  };
  xobj.send(null);
};


var startApp = function(properties) {

  // shell component for the property grid, could potentially add a Header component here
  // not doing a header because I'm assuming you already have one for all the other pages of this site
  class Shell extends React.Component {
    // I'm imagining I'm going to be passing the properties down to many child generations
    // of components so using childContextTypes saves me from having to send them as props to
    // every component
    getChildContext () {
      return {
        saleProperties: properties.sale,
        rentalProperties: properties.lease,
        neighborhood: this.props.match.params.neighborhood
      };
    }

    render () {
      return (
        <div>
          <FilterBar />
        </div>
      );
    }
  };

  Shell.childContextTypes = {
    saleProperties: PropTypes.object.isRequired,
    rentalProperties: PropTypes.object.isRequired,
    neighborhood: PropTypes.string
  };

  const Routes = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={Shell}/>
        <Route path="/:neighborhood" component={Shell}/>
      </Switch>
    </Router>
  )

  ReactDOM.render(<Routes />, document.getElementById('react'));
};


// start up the app by loading in JSON file of properties
// loadJSON('./properties.json', function(properties) {
  startApp(properties);
// }); 
