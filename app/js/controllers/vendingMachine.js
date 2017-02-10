function VendingProductsCtrl(ProductsFactory, ProductService) {
  'ngInject';

//    ViewModel
  const vm = this;

  vm.message = undefined;
  vm.showSpinner = false;
  vm.validDenom = [0.50, 1, 2, 5];

  vm.totalAmount = 0;

  vm.originalStorage = [];

  vm.products = ProductsFactory.getAllProducts();
  // console.log('**********vm.products***********************'+vm.products);

  // for(let i = 0;i< vm.products.length;i++){
  //   console.log(vm.products[i].id);
  // }


  ProductService.setData(vm.products);

  vm.originalStorage = ProductService.getData();
  // vm.originalStorage = ProductService.getData();
  vm.storage = JSON.parse(vm.originalStorage);
  // console.log('************typeof j1s***'+JSON.stringify(vm.storage));
  // // console.log('************typeof js***'+vm.storage);
  // console.log('************typeof j1s***'+JSON.stringify(vm.storage[1]));
  // console.log('************typeof j1s***'+JSON.stringify(vm.storage[2]));
  // // console.log('************typeof 2***'+JSON.stringify(vm.originalStorage));
  // console.log('********let************************************************');
  // // console.log('********let*************************'+JSON.parse(originalStorage));
  // for(let i = 0;i< originalStorage.length;i++){
  //   console.log(JSON.stringify(vm.json[i]));
  // }
  // console.log('array at 1*********************************'+vm.originalStorage);
  // console.log('*********************************'+JSON.parse(vm.originalStorage));


  // console.log(JSON.stringify(vm.originalStorage.localStorage, null, 2));
  // console.log(vm.originalStorage.storage);


  // console.log(JSON.stringify(vm.originalStorage, null, 2));

  // vm.obj = JSON.parse(vm.originalStorage);
  //
  // console.log('*********************************c'+vm.obj);

  vm.product = ProductsFactory.getProduct();

  vm.denominations = ProductsFactory.getDenominations();

  vm.validateItem = function (itemId) {
    if (itemId > 10 || itemId < 1) {
      vm.invalidItemCode = 'Invalid Item Code entered';
    } else {
      vm.itemCode = itemId -1;
      vm.selectedItem = ProductsFactory.getProduct(itemId);
      vm.buyItem();

    }
    //  get item and check if the amount match the price
    //  correct amount minus 1 from the inventory
    //  incorrect amount display insufficiant amount

  };

  vm.buyItem = function () {
    vm.itemMessage = vm.moneyReturned = undefined;
    vm.selectedItem = ProductsFactory.getProduct(vm.itemCode);
    if (vm.totalAmount >= vm.selectedItem.price) {
      vm.getAllProducts = ProductsFactory.getAllProducts();
      for (let i = 0; i < vm.getAllProducts.length; i++) {
        if (vm.selectedItem.id === vm.getAllProducts[i].id && vm.getAllProducts[i].stock !== 0) {
          let stock = vm.getAllProducts[i].stock;
          let price = vm.getAllProducts[i].price;
          vm.totalAmount = vm.totalAmount - price;
          vm.getAllProducts[i].stock =  stock - 1;
          // console.log(JSON.stringify(vm.getAllProducts, null, 2));
          // console.log('*********************************change child');
          // console.log(vm.storage[i]);
        }else{
          let amount = angular.copy(vm.totalAmount);
          vm.totalAmount = 0;
          vm.moneyReturned = 'Item not available, amount returned'+ amount;
        }
      }
    }else{
      vm.itemCode = vm.itemCode + 1;
      vm.itemMessage = 'Insufficient Amount for Item number '+vm.itemCode;
    }
  };

  vm.refreshItem = function (index) {
    vm.product = ProductsFactory.getProduct(index);
    vm.getAllProducts = ProductsFactory.getAllProducts();

    // console.log(JSON.stringify(vm.getAllProducts, null, 2));
    // vm.producted = ProductsFactory.getAllProducts();
    vm.originalStorage = ProductService.getData();
    // console.log(JSON.stringify(vm.originalStorage, null, 2));
    for(let index = 0; index < vm.getAllProducts.length; index++){
        if (vm.product.id === vm.getAllProducts[index].id) {

          vm.getAllProducts[index] = vm.storage[index];
          console.log(JSON.stringify(vm.getAllProducts[index], null, 2));

        }
    }



  };

vm.refreshAllItem = function () {
    vm.getAllProducts = ProductsFactory.getAllProducts();
  // console.log('*********************************'+vm.getAllProducts );
  console.log('*********************************'+vm.storage[1] );
  console.log('*********************************'+JSON.stringify(vm.storage[1]));

  // vm.getAllProducts = JSON.stringify(vm.storage);
  vm.products = vm.storage;
  console.log('*********************************'+JSON.stringify(vm.getAllProducts));

};


  vm.getAmount = function (amount) {
    vm.message = undefined;
    if (!vm.validDenom.includes(amount)) {
      vm.message = 'Invalid amount ' + amount;
    } else {
      vm.totalAmount += amount;
    }
    vm.amount = null;
  };



}

export default {
  name: 'VendingProductsCtrl',
  fn: VendingProductsCtrl
};
