## Nodejs, angularjs1, socketIO, test framework, grunt automation

### Pay attention to mongo-connect's MongoStore new code
1. This project is built under node v5.9.1. Known issue: node v7 won't install grunt-node-inspector
1. decompress db.zip
1. run `npm install` and `npm run postinstall` to run bower, protractor, phantomjs for karma
1. `bower update` not needed as we run npm postinstall
1. run `mongod --dbpath=/Users/derek/Work/Bitbucket/nodejs.mea1n4.testAndAutomation/db --port=27020`
1. run `grunt` or `node server`
1. login username and password: wghglory 123123123

> note: if need newest packages, replace package.json version to *, and `npm update --save`
> currently only passport-local works

### Package List

| package | version | usage |
| --- | --- | --- |
| body-parser | ^1.16.0 | request.body parser, json |
| compression | ^1.6.2 | compress in production |
| connect-flash | ^0.1.1 | error, info message pass |
| ejs | ^2.5.5 | template engine |
| express | ^4.14.1 | high level http server |
| express-session| ^1.15.0 | session management, default in memory |
| method-override| ^2.3.7 | http get post delete put |
| mongoose| ^4.8.1 | mongodb schema, connect to mongodb |
| morgan| ^1.7.0 | error info log |
| passport| ^0.3.2 | login |
| passport-facebook | ^2.1.1 | |
| passport-google-oauth | ^1.0.0 | |
| passport-local | ^1.0.0 | |
| passport-twitter | ^1.0.4 | |
| connect-mongo | ^1.3.2 | store expression session into mongodb, so socketIO can read session from db |
| cookie-parser | ^1.4.3 | read sessionId |
| socket.io | ^1.7.2 | realtime communication |


### Global packages
    npm install -g mocha
    npm install -g karma-cli
    npm install -g grunt-cli
    npm install -g nodemon
    npm install -g bower
    npm install -g csslint
    npm install -g jshint
    npm install -g protractor
