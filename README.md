# property-grid

### setting up for development

Install all the dependencies
```
  npm install
```

We are watching all of our js files in the /js directory and bundling into a static/dist/bundle.js and we're watching and bundling all our scss files in the /scss directory and bundling into static/dist/scss/styles.css EDIT:  I just ended up using the arrange.css file and main.css file you were using at http://clients.philippe.io/lesliegarfield/statamic/properties, still including my styles.css file in index.html, but it only contains the css for react-select

To start watching both js and scss files:
```
  npm start
```

To watch just js files:
```
  npm run watch-js
```

To watch just scss files:
```
  npm run watch-css
```

I didn't bother including any kind of server since obviously you'll be running one, so all you should have to is load up the index.html file into your browser to see the page.  All the sorting and filtering works (as far as I could tell anyway).  Clicking on a property or on map view doesn't do anything.  All the javascript is in static/js.  It starts with app.js which gets the json of properties and then renders the initial react component and then it goes from there.  Let me know if you have any questions or need me to update something.  Sometimes it doesn't render 3 listings on every line like it should, happens for me when I sort square feet lowest to highest.  Quite confusing. 

These npm scripts are all located in the package.json file if you want to see what they are doing.
