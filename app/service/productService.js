let loki = require('lokijs');
let uuidv1 = require('uuid/v1');
let lokidb = new loki('example.db');
let db = lokidb.addCollection('product');

let productService = {

    // Creates a new product
    create: (product) => {
        validate(product);
        product.id = uuidv1();
        db.insert(product);
        return product;
    },

    // Update the product
    update: (product) => {
        if (id == '')
            throw 'Id is mandatory';
        validate(product);
        db.findAndUpdate({ 'id': id, })
    },

    // Delete an existing product
    delete: (id) => {
        if (id == '')
            throw 'Id is mandatory';
        db.removeWhere({ 'id': id });
    },

    // Get all products in db
    getAll: () => {
        return db.find();
    },

    // Gets a product given the id
    getById: (id) => {
        if (id == '')
            throw 'Id is mandatory';
        return db.findOne({ 'id': id });
    }

}

// Validate the model in order to see if all mandatory fields
// has been informed.
function validate(product) {
    if (product.name == '')
        throw 'Product is mandatory.';

    if (product.description == '')
        throw 'Product is mandatory.';

    if (product.quantity < 0)
        throw 'Product is mandatory.';
}

module.exports = productService;