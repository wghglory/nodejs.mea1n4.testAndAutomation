# Unit testing of backend

### 1. Framework
#### Mocha
- supports both BDD and TDD
- do not include assertion
- methods: describe, it, before, beforeEach, after, afterEach
- `npm install -g mocha`
- a test framework, usually use should.js and supertest together

#### Should.js
- assertion library
- good at testing objects, but cannot test HTTP endpoints
- user.should.be.an.Object.and.have.property('name', 'guanghui')
- package.json => "devDependencies":{"should":"~4.0.4"}

#### SuperTest
- assertion library
- test HTTP endpoints
- request(app).get('/user').set('Accept','application/json').expect('Content-Type',/json/).expect(200,done)
- package.json => "devDependencies":{"supertest":"~0.13.0"}

### 2. Configure test environment
- in config/env/test.js: db points to test db

#### express model test by Should.js
- Should.js tests: app/tests/article.server.model.tests.js

#### express controller test by SuperTest
- SuperTest tests: app/tests/articles.server.controller.tests.js, it also includes should.js assertion like res.body.should.be.an.Array.and.have.lengthOf(1);

### 3. Running mocha test
- change test environment: windows: `set NODE_ENV=test`; mac: `export NODE_ENV=test` or `NODE_ENV=test`
- detect if *NODE_ENV* is set in mac: `node` to REPL, then `process.env.NODE_ENV` should be test
- open mongodb: `mongod --dbpath=/Users/derek/Work/Bitbucket/nodejs.meanweb4.testAndAutomation/db --port=27020`
- `mocha --reporter spec app/tests` to run mocha test after below test code is done
- should see passing result and mean-test db

---

# Angular1 unit testing
### 1. Framework

#### Jasmine
- prebundles with assertion using *expect()*, assertion calls *Matchers*
- `expect(a).toBe(1)` or `expect(a).not.toBe(null)`

#### Karma test runner
- install command line tool: `npm install -g karma-cli`
- in package.json devDependencies, include karma, karma-jasmine and karma-phantomjs-launcher
- Configure karma: karma.conf.js

#### Mocking Angular1 components by ngMock
- put it in package.json and bower update
- use frequently:
    - angular.mock.module() to create mock module instances,
    - angular.mock.inject() to inject mock dependencies.

### 2. Write unit testing
- public/articles/tests/unit/articles.client.controller.unit.tests.js

### 3. Running tests
- `NODE_ENV=test karma start` (don't need mongodb start)
- result:
> 03 02 2017 21:17:34.786:INFO [karma]: Karma v1.4.1 server started at http://0.0.0.0:9876/
> 03 02 2017 21:17:34.788:INFO [launcher]: Launching browser PhantomJS with unlimited concurrency
> 03 02 2017 21:17:34.795:INFO [launcher]: Starting browser PhantomJS
> 03 02 2017 21:17:35.626:INFO [PhantomJS 2.1.1 (Mac OS X 0.0.0)]: Connected on socket -8TPImk3PdFOE2ipAAAA with id 53774596
> PhantomJS 2.1.1 (Mac OS X 0.0.0): Executed 2 of 2 SUCCESS (0.003 secs / 0.02 secs)

### 4. Issue solution
> Error during loading "/Users/derek/Work/Bitbucket/nodejs.meanweb4.testAndAutomation/node_modules/karma-phantomjs-launcher" plugin:
>   ==Path must be a string. Received null==

paste this to package.json and after `npm install`, run `npm run postinstall`

```json
"scripts": {
    "postinstall": "node node_modules/phantomjs-prebuilt/install.js"
}
```
or directly run `node node_modules/phantomjs-prebuilt/install.js`

---

# Angular1 E2E testing

### 1. Framework

#### Protractor test runner
- dedicated E2E test runner
- runs tests using the Jasmine test framework by default
- It is basically a Node.js tool, which uses a neat library called WebDriver. WebDriver is an open source utility that allows programmable control over a web browser behavior
- several global objects as follows:
    - **browser**: a WebDriver instance wrapper, which allows you to communicate with the browser.
    - **element**: a helper function to manipulate HTML elements.
    - **by**: a collection of element locator functions. You can use it to find elements by a CSS selector, their ID, or even by the model property they're bound to.
    - **protractor**: a WebDriver namespace wrapper containing a set of static classes and variables.
- `npm install -g protractor` to install
- Since Protractor will need a working WebDriver server, you will either need to use a Selenium server or install a standalone WebDriver server. You can download and install a standalone server by issuing the following command in your command-line tool: `webdriver-manager update`

#### Configure Protractor test runner
- root creates protractor.conf.js

### 2. Write E2E test
- public/articles/tests/e2e/articles.client.e2e.tests.js

### 3. Running test
- Running Protractor is a bit different than using Karma and Mocha. Protractor needs your application to run so that it can access it just like a real user does.
- open mongodb: `mongod --dbpath=/Users/derek/Work/Bitbucket/nodejs.meanweb4.testAndAutomation/db --port=27020`
- `NODE_ENV=test node server`
- `protractor`
- if there is any error related to java, `brew cask install java`
- result: opening chrome, run and close
> [21:48:32] I/launcher - Running 1 instances of WebDriver
> [21:48:32] I/local - Starting selenium standalone server...
> [21:48:33] I/local - Selenium standalone server started at http://192.168.0.2:62638/wd/hub
> Started
> 1 spec, 0 failures
> [21:48:35] I/local - Shutting down selenium standalone server.
> [21:48:35] I/launcher - 0 instance(s) of WebDriver still running
> [21:48:35] I/launcher - chrome #01 passed

### 4. Issue solution
If ==No selenium server jar==, it's because webdriver-manager is not installed.
- running test by protractor itself, run command above `webdriver-manager update`
- running test by grunt, read Automation.md.
