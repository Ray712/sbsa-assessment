    function ProductService( $window) {
  'ngInject';

    return {
      setData: function(store,val) {
        $window.localStorage && $window.localStorage.setItem(store, JSON.stringify(val));
        return this;
      },
      getData: function(store) {
        return $window.localStorage && $window.localStorage.getItem(store);
      }
    };
}

export default {
  name: 'ProductService',
  fn: ProductService
};
