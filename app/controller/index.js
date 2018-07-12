var express = require('express');
var router = express.Router();

// Externalized the business logic for each route.
var auth = require('./authController');
var products = require('./productController');
 
// Routes that can be accessed by any one
router.post('/login', auth.login);
 
// Routes that can be accessed only by autheticated users
router.get('/api/v1/product', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);
 
module.exports = router;