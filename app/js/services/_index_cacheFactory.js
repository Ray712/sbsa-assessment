import angular from 'angular';

const bulk = require('bulk-require');
const factoryModule = angular.module('app.services', []);
const services = bulk(__dirname, ['./**/!(*index|*.spec).js']);

function declare(serviceMap) {
  Object.keys(serviceMap).forEach((key) => {
    let item = serviceMap[key];

    if (!item) {
      return;
    }

    if (item.fn && typeof item.fn === 'function') {
      factoryModule.service(item.name, item.fn);
    } else {
      declare(item);
    }
  });
}

declare(services);

export default factoryModule;


//
//
// 'use strict';
//
// var angular = require('angular');
// var bulk = require('bulk-require');
//
// module.exports = angular.module('app.common.cacheFactory.applicationCacheFactory', []);
//
// bulk(__dirname, ['./**/!(*_index|*.spec).js']);
