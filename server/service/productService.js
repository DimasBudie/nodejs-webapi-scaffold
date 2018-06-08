let loki = require('lokijs');
let uuidv1 = require('uuid/v1');
let lokidb = new loki('example.db');
let db = lokidb.addCollection('product');

// Validate the model in order to see if all mandatory fields
// has been informed.
function validateModel(product) {
    if (product.name == '')
        throw 'Product is mandatory.';

    if (product.description == '')
        throw 'Product is mandatory.';

    if (product.quantity < 0)
        throw 'Product is mandatory.';
}

let productService = {

    // Creates a new product
    create: function (product) {
        validateModel(product);
        product.id = uuidv1();
        db.insert(product);
        return product;
    },

    // Update the product
    update: function (product) {
        if (id == '')
            throw 'Id is mandatory';
        validateModel(product);
        db.findAndUpdate({ 'id' : id, })
    },

    // Delete an existing product
    delete: function (id) {
        if (id == '')
            throw 'Id is mandatory';
        db.removeWhere({ 'id': id });
    },

    // Get all products in db
    getAll: function () {
        return db.find();
    },

    // Gets a product given the id
    getById: function (id) {
        if (id == '')
            throw 'Id is mandatory';
        return db.findOne({ 'id' : id });
    }

}

module.exports = productService;