function VendingProductsCtrl(ProductsFactory) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify! Written with keyboards and love!';
  vm.number = 1234;

  vm.message = undefined;
  vm.validDenom = [0.50, 1, 2, 5];
  vm.totalAmount = 0;

  vm.products = ProductsFactory.getProducts();
  vm.product = ProductsFactory.getProduct();

  vm.denominations = ProductsFactory.getDenominations();

  vm.buyItem = function (itemId) {
    console.log('hey44454555'+ itemId);

  };

  vm.getAmount = function (amount) {
    vm.message = undefined;
    // console.log(vm.validDenom.includes(amount));

    if(!vm.validDenom.includes(amount)){
      vm.message = 'Invalid amount '+ amount;
    }else{
      vm.totalAmount += amount;
    }
    vm.amount = null;
    // console.log(vm.totalAmount);
  };


}

export default {
  name: 'VendingProductsCtrl',
  fn: VendingProductsCtrl
};
