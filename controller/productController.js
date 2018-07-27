const service = require('../service/productService');

let productController = {

  getAll: (req, res) => {
    let list = service.getAll();
    res.json(list);
  },

  getOne: (req, res) => {
    var id = req.params.id;
    let data = service.getById(id);
    res.json(data);
  },

  create: (req, res) => {
    let product = req.body;
    product = service.create(product);
    res.json(product);
  },

  update: (req, res) => {
    var product = req.body;
    product.id = req.params.id;
    product = service.update(product);
    res.json(product);
  },

  delete: (req, res) => {
    var id = req.params.id;
    service.delete(id);
    res.json(true);
  }
};

module.exports = productController;