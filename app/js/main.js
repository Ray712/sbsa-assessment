import angular from 'angular';

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';

import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'lodash';
import 'angular-spinner';
import './templates';
// import './filters';
// import './controllers';
import './controllers/_index_vendingMachine';
import './services';
import './services/_index_productsFactory';
// import './factory';
// import './directives';

// create and bootstrap application
const requires = [
  'ui.router',
  'templates',
  // 'app.filters',
  'ui.bootstrap',
  'angularSpinner',
  // 'app.controllers.vendingMachine',
  'app.controllers',
  'app.services',
  // 'app.services.productsFactory'
  // 'app.factory',
  // 'app.directives'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
