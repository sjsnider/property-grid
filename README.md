# property-grid

### setting up for development

Install all the dependencies
```
  npm install
```

We are watching all of our js files in the /js directory and bundling into a static/dist/bundle.js and we're watching and bundling all our scss files in the /scss directory and bundling into static/dist/scss/styles.css EDIT:  I just ended up using the arrange.css file and main.css file you were using at http://clients.philippe.io/lesliegarfield/statamic/properties, still including my styles.css file in index.html, but it only contains the css for react-select

When developing start watching both js and scss files:
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

When ready to push for production be sure to minify the bundle.js file
```
  npm run build-js
```

When developing on a Mac it's a common problem with browserify to get errors from opening too many files at once, https://github.com/substack/node-browserify/issues/431.  To prevent this from being an issue change your upper limit in your bash profile, http://hathaway.cc/post/69201163472/how-to-edit-your-path-environment-variables-on-mac   Just add this line to it...
```
  # Work around bug in browserify
  ulimit -n 2560
```

To see it working move into the static directory
```
  cd property-grid/static
```

Then start a simple Python server
```
  python -m SimpleHTTPServer
```

And paste http://localhost:8000/ into the browser

All the sorting and filtering works (as far as I could tell anyway).  Clicking on a property or on map view doesn't do anything.  All the javascript is in static/js.  It starts with app.js which gets the json of properties and then renders the initial react component and then it goes from there.  Let me know if you have any questions or need me to update something.  Sometimes it doesn't render 3 listings on every line like it should, happens for me when I sort square feet lowest to highest.  Quite confusing. 

These npm scripts are all located in the package.json file if you want to see what they are doing.
