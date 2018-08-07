'use strict';

const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const homeController = require('./home.controller');
const clienteController = require('./cliente.controller');
const emprestimoController = require('./emprestimo.controller');
const configuracaoController = require('./configuracao.controller');
const investidorController = require('./investidor.controller');

const auth = authController.validateAuth;
setRoutesForAuth(router);
setRoutesForHome(router);
setRoutesForCliente(router);
setRoutesForEmprestimo(router);
setRoutesForConfiguracao(router);
setRoutesForInvestidor(router);

function setRoutesForAuth(router) {
    router.get('/', authController.index);
    router.post('/login', authController.login);
    router.get('/logout', authController.logout);
}

function setRoutesForHome(router) {
    router.get('/home', auth, homeController.index);
}

function setRoutesForCliente(router) {
    router.get('/cliente', auth, clienteController.index);
    router.get('/cliente-detalhe/:id', auth, clienteController.detalhe);
}

function setRoutesForEmprestimo(router) {
    router.get('/emprestimo', auth, emprestimoController.index);
    router.get('/emprestimo-novo', auth, emprestimoController.novo);
    router.get('/emprestimo-simula', auth, emprestimoController.simulador);
    router.get('/emprestimo-detalhe/:id', emprestimoController.detalhe);
}

function setRoutesForConfiguracao(router){
    router.get('/configuracao', auth, configuracaoController.index);
}

function setRoutesForInvestidor(router){
    router.get('/investidor', auth, investidorController.index);
    router.post('/create', auth, investidorController.create);
}

module.exports = router;