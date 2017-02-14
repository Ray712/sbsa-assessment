function VendingProductsCtrl(ProductsFactory, ProductService, $timeout) {
  'ngInject';

//    ViewModel
  const vm = this;
  vm.showSpinner = false;

  vm.message = undefined;
  vm.showSpinner = false;
  vm.validDenom = [0.50, 1, 2, 5];
  vm.totalAmount = 0;


  function callAtTimeout() {
    vm.showSpinner = false;
  }

  vm.originalStorage = [];

  vm.products = ProductsFactory.getAllProducts();


  ProductService.setData('products', vm.products);

  vm.originalStorage = ProductService.getData('products');
  vm.storage = JSON.parse(vm.originalStorage);

  vm.product = ProductsFactory.getProduct();

  vm.validateItem = function (itemId) {
    vm.itemCode = itemId;
    if (itemId > 10 || itemId < 1) {
      vm.invalidItemCode = 'Invalid Item Code entered';
    } else {
      vm.buyItem(ProductsFactory.getProduct(itemId - 1));
    }
  };

  vm.buyItem = function (item) {
    vm.selectedItem = item;
    vm.totalAmount = ProductService.getData('amount');
    vm.totalAmount = parseInt(vm.totalAmount);
    vm.itemMessage = vm.moneyReturned = undefined;
    if (vm.totalAmount >= parseInt(vm.selectedItem.price)) {
      vm.allProducts = ProductsFactory.getAllProducts();
      for (let i = 0; i < vm.allProducts.length; i++) {
        console.log('show :selectedItem.id: '+vm.selectedItem.id+' :id: '+vm.allProducts[i].id+'  :stock: '+vm.allProducts[i].stock);
        if (vm.selectedItem.id === vm.allProducts[i].id && vm.allProducts[i].stock !== 0) {
          let stock = vm.allProducts[i].stock;
          let price = vm.allProducts[i].price;
          console.log('first if '+JSON.stringify(vm.selectedItem,null,2));

          stock = stock - 1;
          vm.totalAmount = vm.totalAmount - price;
          ProductService.setData('amount', vm.totalAmount);
          vm.allProducts[i].stock = stock;
          vm.itemMessage = vm.moneyReturned = undefined;
        } else if(vm.selectedItem.id === vm.allProducts[i].id && vm.allProducts[i].stock === 0){
          vm.returnedAmount = vm.totalAmount;
           vm.totalAmount = 0;
          vm.moneyReturned = ' Item not available, amount returned ' + vm.returnedAmount;
          ProductService.setData('amount', null);
        }
      }
    } else {
      vm.itemMessage = 'Insufficient Amount for Item name ' + vm.selectedItem.name;
    }
  };

  vm.refreshItem = function (index) {
    vm.showSpinner = true;
    $timeout(callAtTimeout, 2000);
    vm.product = ProductsFactory.getProduct(index);
    vm.allProducts = ProductsFactory.getAllProducts();
    vm.originalStorage = ProductService.getData();
    for (let index = 0; index < vm.allProducts.length; index++) {
      if (vm.product.id === vm.allProducts[index].id) {
        vm.allProducts[index] = vm.storage[index];
      }
    }
  };

  vm.refreshAllItem = function () {
    vm.showSpinner = true;
    $timeout(callAtTimeout, 3000);
    vm.allProducts = ProductsFactory.getAllProducts();
    vm.products = vm.storage;
  };


  vm.getAmount = function (amount) {
    vm.message = undefined;
    if (!vm.validDenom.includes(amount)) {
      vm.message = 'Invalid amount ' + amount;
    } else {
      vm.totalAmount += amount;
    }
    ProductService.setData('amount', vm.totalAmount);
    vm.amount = null;

  };
}

export default {
  name: 'VendingProductsCtrl',
  fn: VendingProductsCtrl
};
