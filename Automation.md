### Installing the Grunt task runner
- `npm install -g grunt-cli`
- package.json devDependencies
        "grunt": "1.0.1",
        "grunt-concurrent": "2.3.1",
        "grunt-contrib-csslint": "2.0.0",
        "grunt-contrib-jshint": "1.1.0",
        "grunt-contrib-watch": "1.0.0",
        "grunt-env": "0.4.4",
        "grunt-karma": "2.0.0",
        "grunt-mocha-test": "0.13.2",
        "grunt-node-inspector": "^0.4.2",   //works in node 5. node 7 no
        "grunt-nodemon": "0.4.2",
        "grunt-protractor-runner": "4.0.0"  

### Configuring Grunt
- Gruntfile.js
- you'll also need to download and install Protractor's standalone WebDriver server by issuing the following command in your command-line tool:
`node ./node_modules/grunt-protractor-runner/scripts/webdriver-manager-update`

### Running grunt
- 4 commands based on Gruntfile.js
        grunt
        grunt debug
        grunt test
        grunt lint
