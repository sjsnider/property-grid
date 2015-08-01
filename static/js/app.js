var React = require('react');
var PropertyView = require('./components/PropertyView.react');

var loadJSON = function(path, callback, key) {
  // var xobj = new XMLHttpRequest();
  // xobj.overrideMimeType("application/json");
  // xobj.open('GET', path, true);
  // xobj.onreadystatechange = function() {
  //   if (xobj.readyState == 4 && xobj.status == "200") {
  //     callback(JSON.parse(xobj.response));
  //   }
  // };
  // xobj.send(null);

  // since I'm not actually starting up a server I'm just cheating and declaring the json
  // here rather than making an actual request to get it, not sure where you're going to be
  // getting it from
  callback({
        "sale_properties" : {
                "east_63rd_street": { "title": "East 63rd Street", "pictureSrc": "img/1.jpeg", "price": 10000000, "type": "multi-family", "sqft": "12,000", "location": "upper east side" },
                "east_54th_street": { "title": "East 54th Street", "pictureSrc": "img/2.jpeg", "price": 3000000, "type": "multi-family", "sqft": "11,000", "location": "upper east side" },
                "west_31st_street": { "title": "West 31st Street", "pictureSrc": "img/3.jpeg", "price": 2000000, "type": "single-family", "sqft": "10,000", "location": "upper west side" },                
                "east_23rd_street": { "title": "East 23rd Street", "pictureSrc": "img/4.jpeg", "price": 1000000, "type": "multi-family", "sqft": "13,000", "location": "upper north side" },
                "east_24th_street": { "title": "East 24th Street", "pictureSrc": "img/5.jpeg", "price": 3000000, "type": "multi-family", "sqft": "19,000", "location": "upper east side" },
                "west_21st_street": { "title": "West 21st Street", "pictureSrc": "img/6.jpeg", "price": 2050000, "type": "single-family", "sqft": "10,500", "location": "upper west side" }
        },        
        "rental_properties" : {
                "east_73rd_street": { "title": "East 73rd Street", "pictureSrc": "img/1.jpeg", "price": 10000000, "type": "multi-family", "sqft": "12,000", "location": "south east side" },
                "east_59th_street": { "title": "East 59th Street", "pictureSrc": "img/2.jpeg", "price": 3000000, "type": "multi-family", "sqft": "11,000", "location": "upper east side" },
                "west_34st_street": { "title": "West 34st Street", "pictureSrc": "img/3.jpeg", "price": 2000000, "type": "single-family", "sqft": "10,000", "location": "south west side" },                
                "east_25th_street": { "title": "East 25th Street", "pictureSrc": "img/4.jpeg", "price": 1000000, "type": "multi-family", "sqft": "13,000", "location": "upper east side" },
                "east_27th_street": { "title": "East 27th Street", "pictureSrc": "img/5.jpeg", "price": 3000000, "type": "multi-family", "sqft": "19,000", "location": "upper east side" },
                "west_99th_street": { "title": "West 99th Street", "pictureSrc": "img/6.jpeg", "price": 2050000, "type": "single-family", "sqft": "10,500", "location": "upper west side" }
        }
  });
};


var startApp = function(properties) {

  // shell component for the property grid, could potentially add a Header component here
  // not doing a header because I'm assuming you already have one for all the other pages of this site
  var Shell = React.createClass({
    // I'm imagining I'm going to be passing the properties down to many child generations
    // of components so using childContextTypes saves me from having to send them as props to
    // every component
    childContextTypes: {
      saleProperties: React.PropTypes.object.isRequired,
      rentalProperties: React.PropTypes.object.isRequired
    },
    getChildContext: function() {
      return {
        saleProperties: properties.sale_properties,
        rentalProperties: properties.rental_properties
      };
    },
    render: function() {
      return (
        <div>
          <PropertyView />
        </div>
      );
    }
  });

  React.render(<Shell />, document.getElementById('react'));
};

// start up the app by loading in JSON file of properties
loadJSON('properties.json', function(properties) {
  startApp(properties);
}); 
