
// import '../../node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css';
import angular from 'angular';

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';

import 'angular-ui-router';
import 'lodash';
import 'angular-spinner';
import 'angular-ui-bootstrap';
import './templates';
import './controllers/_index_vendingMachine';
import './services';
import './services/_index_productsFactory';

// create and bootstrap application
const requires = [
  'ui.router',
  'ui.bootstrap',
  'templates',
  'angularSpinner',
  'app.controllers',
  'app.services'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
