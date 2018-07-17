"use strict";

const express = require('express');
const router = express.Router();

// Externalized the business logic for each route.
const authController = require('./authController');
const productController = require('./productController');
 
// Routes that can be accessed by any one
router.post('/login', authController.login);
 
// Routes that can be accessed only by autheticated users
router.get('/api/v1/product', productController.getAll);
router.get('/api/v1/product/:id', productController.getOne);
router.post('/api/v1/product/', productController.create);
router.put('/api/v1/product/:id', productController.update);
router.delete('/api/v1/product/:id', productController.delete);
 
module.exports = router;