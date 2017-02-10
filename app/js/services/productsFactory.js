function ProductsFactory() {
  'ngInject';

  let instanceArray = [];
  instanceArray.push({'id':1,'name':'Simba Salt and Vinegar','price':'5.00','stock':10});
  instanceArray.push({'id':2,'name':'Simba Tomato','price':'5.00','stock':5});
  instanceArray.push({'id':3,'name':'Coke','price':'8.00','stock':7});
  instanceArray.push({'id':4,'name':'Sprite','price':'8.00','stock':2});
  instanceArray.push({'id':5,'name':'Fanta','price':'8.00','stock':0});
  instanceArray.push({'id':6,'name':'Bar One','price':'7.50','stock':10});
  instanceArray.push({'id':7,'name':'Tex','price':'8.50','stock':9});
  instanceArray.push({'id':8,'name':'Fritos','price':'5.00','stock':0});
  instanceArray.push({'id':9,'name':'Big Corn Bites','price':'5.00','stock':2});
  instanceArray.push({'id':10,'name':'Water','price':'4.00','stock':0});
  // instanceArray.push(product [{'id':1,'name':'Simba Salt and Vinegar','price':'5.00','stock':10}]);
  //


  const service = {};

  service.getProduct = function(id) {
    return instanceArray[id];
};

  service.getDenominations = function () {
        let denominations = [];
        denominations.push({'amount': 50,'amount': 1,'amount':2, 'amount': 5});
        return denominations;
  };

  service.getAllProducts = function () {

    // let instanceArray = [];
    // instanceArray.push({'id':1,'name':'Simba Salt and Vinegar','price':'5.00','stock':10});
  	// instanceArray.push({'id':2,'name':'Simba Tomato','price':'5.00','stock':5});
  	// instanceArray.push({'id':3,'name':'Coke','price':'8.00','stock':7});
  	// instanceArray.push({'id':4,'name':'Sprite','price':'8.00','stock':2});
  	// instanceArray.push({'id':5,'name':'Fanta','price':'8.00','stock':0});
  	// instanceArray.push({'id':6,'name':'Bar One','price':'7.50','stock':10});
  	// instanceArray.push({'id':7,'name':'Tex','price':'8.50','stock':9});
  	// instanceArray.push({'id':8,'name':'Fritos','price':'5.00','stock':0});
  	// instanceArray.push({'id':9,'name':'Big Corn Bites','price':'5.00','stock':2});
  	// instanceArray.push({'id':10,'name':'Water','price':'4.00','stock':0});

    return instanceArray;

  };

  return service;

}

export default {
  name: 'ProductsFactory',
  fn: ProductsFactory
};
