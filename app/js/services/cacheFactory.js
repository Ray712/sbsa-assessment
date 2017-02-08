function CacheFactory($http,$cacheFactory) {
  'ngInject';

  const service = {};

  service.get = function() {
     return $cacheFactory('applicationCache');
  };

  return service;

}

export default {
  name: 'CacheFactory',
  fn: CacheFactory
};
