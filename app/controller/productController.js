var service = require('../service/productService');

var data = [{
  name: 'product 1',
  id: '1'
}, {
  name: 'product 2',
  id: '2'
}, {
  name: 'product 3',
  id: '3'
}];

var productController = {

  getAll: function (req, res) {    
    let list = service.getAll();
    res.json(list);
  },

  getOne: function (req, res) {
    var id = req.params.id;    
    let data = service.getById(id);
    res.json(data);
  },

  create: function (req, res) {
    let product = req.body;
    product = service.create(product);        
    res.json(product);
  },

  update: function (req, res) {
    var product = req.body;
    product.id = req.params.id;
    product = service.update(product);    
    res.json(product);
  },

  delete: function (req, res) {
    var id = req.params.id;
    service.delete(id);
    res.json(true);
  }
};

module.exports = productController;