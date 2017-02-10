
describe('Unit: VendingProductsCtrl', function() {

  let ctrl, product;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    angular.mock.inject(($controller, ProductsFactory) => {
      ctrl = $controller('VendingProductsCtrl');
      product = ProductsFactory;
    });
  });

  it('should exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('should have array of valid denominations', function() {
    expect(ctrl.validDenom).toBeDefined();
    expect(ctrl.validDenom[0]).toBe(.5);
    expect(ctrl.totalAmount).toBe(0);
  });


  it('should have the VendingProductsCtrl function variables defined', function() {
    expect(ctrl.message).toBeUndefined();
    expect(ctrl.validDenom[2]).toEqual(2);
    expect(ctrl.totalAmount).toEqual(0);
  });

  it('should have the validate item code', function () {
    expect(ctrl.validateItem).toBeDefined();
    ctrl.validateItem(2);
    expect(ctrl.itemCode).toBeDefined();
    expect(ctrl.itemCode).toBeLessThan(11);
  });

  it('should not have the correct item code ', () => {
    expect(ctrl.validateItem).toBeDefined();
    ctrl.validateItem(0);
    expect(ctrl.invalidItemCode).toEqual('Invalid Item Code entered');
  });

  it('should get the inserted coins and validate correct coin ',() => {
    expect(ctrl.getAmount).toBeDefined();
    expect(ctrl.message).toBeUndefined();
    ctrl.getAmount(1);
  });

  it('should get the inserted coins and validate incorrect coin ',() => {
    expect(ctrl.getAmount).toBeDefined();
    expect(ctrl.message).toBeUndefined();
    ctrl.getAmount(3);
  });

  describe('item purchase ', () => {
    it('should find the selected item id ', () => {
      let itemId  = 1;
      expect(itemId).toEqual(1);
      expect(product.getAllProducts).toBeDefined();
      let selectedProduct = product.getProduct(1);
      expect(selectedProduct.id).toEqual(2);
      selectedProduct = product.getProduct(9);
      expect(selectedProduct.id).toEqual(10);
      // expect(product.getAllProducts[0].id).toEqual(1);
    });

  });

});
