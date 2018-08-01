'use strict';

const express = require('express');
const router = express.Router();
const authController = require('./authController');
const productController = require('./productController');

setRouteAuth(router);
setRouteProduct(router);

function setRouteAuth(router) {
    /**
     * @api {post} /login Authentication
     * @apiGroup General
     * 
     * @apiParamExample {json} Request
     * {
     *    "username":"any-username",
     *    "password":"any-password"
     * }
     * 
     * @apiSuccessExample Respose
     * {
     *    "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
     *    "expiresIn": 1531936602893,
     *    "tokenType": "bearer"
     * } 
     */
    router.post('/api/login', authController.login);
}

function setRouteProduct(router) {
    /**
     * @api {get} /api/v1/product Get all products
     * @apiGroup Product
     * 
     * @apiSuccessExample Response
     * [
     *     {
     *         "name": "Product Name",
     *         "description": "Product Description",
     *         "quantity": 100,
     *         "id": "708303a0-89f4-11e8-b3e3-c7a13cf0f3f4",
     *     },
     *     {
     *         "name": "Product Name",
     *         "description": "Product Description",
     *         "quantity": 2,
     *         "id": "76d9f060-89f4-11e8-b3e3-c7a13cf0f3f4",
     *     }
     * ] 
     */
    router.get('/api/v1/product', productController.getAll);

    /**
     * @api {get} /api/v1/product/:id Get product by id
     * @apiGroup Product
     * 
     * @apiSuccessExample Response
     * {
     *     "name": "Product Name",
     *     "description": "Product Description",
     *     "quantity": 2,
     *     "id": "76d9f060-89f4-11e8-b3e3-c7a13cf0f3f4",
     * } 
     */
    router.get('/api/v1/product/:id', productController.getOne);

    /**
     * @api {post} /api/v1/product/ Creates a new product
     * @apiGroup Product
     * 
     * @apiParamExample {json} Request
     * {
     * }
     * 
     * @apiSuccessExample Response
     * {
     * }
     */
    router.post('/api/v1/product/', productController.create);

    /**
     * @api {put} /api/v1/product/ Update a product
     * @apiGroup Product
     * 
     * @apiParamExample {json} Request
     * {
     * }
     * 
     * @apiSuccessExample Response
     * {
     * }
     */
    router.put('/api/v1/product/:id', productController.update);

        /**
     * @api {delete} /api/v1/product/:id Delete a product
     * @apiGroup Product
     *      
     * @apiSuccessExample Response
     * {
     * }
     */
    router.delete('/api/v1/product/:id', productController.delete);
}

module.exports = router;