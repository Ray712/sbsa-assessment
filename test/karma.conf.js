const istanbul = require('browserify-istanbul');
const isparta  = require('isparta');

const karmaBaseConfig = {

  basePath: '../',

  singleRun: true,

  frameworks: ['jasmine', 'browserify'],

  preprocessors: {
    'app/js/**/*.js': ['browserify', 'coverage'],
    'test/**/*.js': ['browserify']
  },

  browsers: ['Chrome'],

  reporters: ['progress', 'coverage'],

  autoWatch: true,

  browserify: {
    debug: true,
    extensions: ['.js'],
    transform: [
      'babelify',
      'browserify-ngannotate',
      'bulkify',
      istanbul({
        instrumenter: isparta,
        ignore: ['**/node_modules/**', '**/test/**']
      })
    ]
  },

  proxies: {
    '/': 'http://localhost:9876/'
  },
  colors: true,
  urlRoot: '/__karma__/',

  coverageReporter: {
    sourceStore: require('istanbul').Store.create('fslookup'),
    reporters: [
      {'type': 'text'},//to display table with line not tested
//                {'type': 'html'},
      {'type': 'html', dir: 'coverage'}
    ]
  },

  files: [
    // app-specific code
    'app/js/main.js',

    // 3rd-party resources
    'node_modules/angular-mocks/angular-mocks.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',

    // test files
    'test/unit/**/*.js'
  ]

};

const customLaunchers = {
  chrome: {
    base: 'SauceLabs',
    browserName: 'chrome'
  }
};

const ciAdditions = {
  sauceLabs: {
    testName: 'Karma Unit Tests',
    startConnect: false,
    build: process.env.TRAVIS_BUILD_NUMBER,
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
  },
  browsers: Object.keys(customLaunchers),
  customLaunchers: customLaunchers,
  reporters: ['progress', 'coverage', 'saucelabs']
};

module.exports = function(config) {
  const isCI = process.env.CI && Boolean(process.env.TRAVIS_PULL_REQUEST);
  config.set(isCI ? Object.assign(karmaBaseConfig, ciAdditions) : karmaBaseConfig);
};
