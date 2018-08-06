const loki = require('lokijs');
const uuidv1 = require('uuid/v1');
const lokidb = new loki('example.db');
const db = lokidb.addCollection('product');

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
        throw 'name is mandatory';

    if (product.description == '')
        throw 'description is mandatory';

    if (product.quantity < 0)
        throw 'quantity is mandatory';
}

module.exports = productService;