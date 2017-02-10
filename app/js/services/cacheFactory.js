    function ProductService($rootScope, $window) {
  'ngInject';


  // return {
  //     setProd: function(key, value) {
  //       $window.localStorage[key] = value;
  //     },
  //     get: function(key, defaultValue) {
  //       return $window.localStorage[key] || defaultValue;
  //     },
  //     setObject: function(key, value) {
  //       $window.localStorage[key] = JSON.stringify(value);
  //     },
  //     getObject: function(key) {
  //       return JSON.parse($window.localStorage[key] || '{}');
  //     }
  //   };

    return {
      setData: function(val) {
        $window.localStorage && $window.localStorage.setItem('storage', JSON.stringify(val));
        // console.log('storage in a service ' + " is now " + JSON.stringify(val[1]));
        return this;
      },
      getData: function() {
        return $window.localStorage && $window.localStorage.getItem('storage');
      }
    };


}

export default {
  name: 'ProductService',
  fn: ProductService
};
