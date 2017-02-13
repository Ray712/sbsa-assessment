describe('Unit: VendingProductsCtrl', function () {

  let ctrl, product, cacheService;

  beforeEach(function () {
    // instantiate the app module
    angular.mock.module('app');

    angular.mock.inject(($controller, ProductsFactory, ProductService) => {
      ctrl = $controller('VendingProductsCtrl');
      product = ProductsFactory;
      cacheService = ProductService;
    });
  });

  it('should exist', function () {
    expect(ctrl).toBeDefined();
  });

  it('should have array of valid denominations', function () {
    expect(ctrl.validDenom).toBeDefined();
    expect(ctrl.validDenom[0]).toBe(.5);
    expect(ctrl.amount).toBeUndefined();
  });

  it('should have the VendingProductsCtrl function variables defined', function () {
    expect(ctrl.message).toBeUndefined();
    expect(ctrl.validDenom[2]).toEqual(2);
    ctrl.getAmount(5);
    expect(ctrl.amount).toEqual(null);
  });


  it('should have the validate item code', function () {
    expect(ctrl.validateItem).toBeDefined();
    ctrl.validateItem(2);
    expect(ctrl.itemCode).toBeUndefined();
  });

  it('should not have the correct item code ', () => {
    ctrl.getAmount(3);
    expect(ctrl.validateItem).toBeDefined();
    ctrl.validateItem(0);
    expect(ctrl.invalidItemCode).toEqual('Invalid Item Code entered');
  });

  it('should get the inserted coins and validate correct coin ', () => {
    expect(ctrl.getAmount).toBeDefined();
    expect(ctrl.message).toBeUndefined();
    ctrl.getAmount(1);
  });

  it('should get the inserted coins and validate incorrect coin ', () => {
    expect(ctrl.getAmount).toBeDefined();
    expect(ctrl.message).toBeUndefined();
    ctrl.getAmount(3);
  });

  describe('item purchase ', () => {
    it('should find the selected item id ', () => {
      let itemId = 1;
      expect(itemId).toEqual(1);
      expect(product.getAllProducts).toBeDefined();
      let selectedProduct = product.getProduct(1);
      expect(selectedProduct.id).toEqual(2);
      selectedProduct = product.getProduct(9);
      expect(selectedProduct.id).toEqual(10);
      ctrl.getAmount(5);
      expect(ctrl.totalAmount).toEqual(5);
      expect(ctrl.buyItem).toBeDefined();
    });

    it('should find the selected item id with zero stock', () => {
      ctrl.selectedItem = {'id':10,'name':'Water','price':'4.00','stock':0};
      expect(product.getAllProducts).toBeDefined();
      expect(ctrl.allProducts).toBeUndefined();

      expect(ctrl.selectedItem).toBeDefined();
      ctrl.allProducts = {'id':10,'name':'Water','price':'4.00','stock':0};
      expect(ctrl.allProducts.id).toEqual(10);
      ctrl.getAmount(5);
      expect(ctrl.totalAmount).toEqual(5);
      expect(ctrl.buyItem).toBeDefined();
    });

    it('should be able to buy the item selected ', () => {
      ctrl.getAmount(1);
      cacheService.getData('amount');
      expect(ctrl.selectedItem).toBeUndefined();
      ctrl.selectedItem = product.getProduct(9);
      expect(ctrl.selectedItem).toBeDefined();
      expect(ctrl.amount).toEqual(null);
      expect(ctrl.totalAmount).toEqual(1);
      ctrl.amount = 6.00;
      expect(ctrl.message).toBeUndefined();
      expect(ctrl.moneyReturned).toBeUndefined();
      expect(ctrl.selectedItem.price).toEqual('4.00');
      expect(parseInt(ctrl.selectedItem.price)).toBeLessThan(ctrl.amount);
      ctrl.amount = 7.00;
      expect(parseInt(ctrl.selectedItem.price)).toBeLessThan(parseInt(ctrl.amount));


    });

    it('should have insufficient money to buy the item selected ', () => {
      ctrl.getAmount(1);
      ctrl.selectedItem = product.getProduct(1);
      expect(ctrl.selectedItem).toBeDefined();
      expect(ctrl.amount).toEqual(null);
      expect(ctrl.totalAmount).toEqual(1);
      expect(ctrl.message).toBeUndefined();
      expect(ctrl.moneyReturned).toBeUndefined();
      expect(ctrl.selectedItem.price).toEqual('5.00');
      expect(ctrl.amount).toBeLessThan(parseInt(ctrl.selectedItem.price));
    });

  });
  describe('refresh data ', () => {
    it('should refresh single product ', () => {
      let item = {'id': 10, 'name': 'Water', 'price': '4.00', 'stock': 2};
      expect(item.stock).toEqual(2);
      ctrl.refreshItem(9);
      item = ctrl.selectedItem = product.getProduct(9);
      expect(item.stock).toEqual(0);
    });

    it('should refresh all the data ', () => {
      let item = {'id': 10, 'name': 'Water', 'price': '4.00', 'stock': 2};
      expect(item.stock).toEqual(2);
      ctrl.refreshAllItem();
      item = ctrl.selectedItem = product.getProduct(9);
      expect(item.stock).toEqual(0);
    });
  });

});
