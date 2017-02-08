
describe('Unit: VendingProductsCtrl', function() {

  let ctrl;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    angular.mock.inject(($controller) => {
      ctrl = $controller('VendingProductsCtrl');
    });
  });

  it('should exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('should have array of valid denominations', function() {
    expect(ctrl.validDenom).toBeDefined();
    expect(ctrl.validDenom[0]).toBe(.5);
  });


  it('should have the VendingProductsCtrl function variables defined', function() {
    expect(ctrl.message).toBeUndefined();
    expect(ctrl.validDenom[2]).toEqual(2);
    expect(ctrl.totalAmount).toEqual(0);
  });

  it('should have the buyItem function', function () {
    expect(ctrl.buyItem).toBeDefined();
    ctrl.buyItem(2);
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
});
