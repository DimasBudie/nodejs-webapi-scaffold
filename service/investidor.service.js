const db = require('../repository/investidor.repository');
const configService = require('../service/configuracao.service');
const moment = require('moment');

module.exports = {

    getAll: async () => {
        return await db.getAll();
    },

    getById: async (id) => {
        if (!id) {
            throw "Id é obrigatório";
        }

        return await db.getById(id);
    },

    getDetault: async () => {
        let config = await configService.get();
        return {
            _id: null,
            nome: '',
            taxa: config.taxaInvestidor,
            cpf: '',
            saldo: 0,
            operacoes: null
        };
    },

    create: async (investidor) => {
        if (!investidor.nome) throw "Nome é obrigatório";
        if (!investidor.taxa) throw "Taxa é obrigatório";
        if (!investidor.cpf) throw "Cpf é obrigatório";

        return await db.create(investidor);;
    },

    updateDadoBasico: async (investidor) => {
        if (!investidor.id) throw "Id é obrigatório";
        if (!investidor.nome) throw "Nome é obrigatório";
        if (!investidor.taxa) throw "Taxa é obrigatório";
        if (!investidor.cpf) throw "Cpf é obrigatório";

        let model = await db.getById(investidor.id);
        model.nome = investidor.nome;
        model.taxaInvestidor = investidor.taxaInvestidor;
        model.cpf = investidor.cpf;
        return await db.update(model);
    },

    createLancamento: async (investidor) => {
        if (!investidor.id) throw "Id é obrigatório";
        if (!investidor.valor) throw "Valor é obrigatório";
        if (!investidor.tipo) throw "Tipo é obrigatório";

        let model = await db.getById(investidor.id);
        model.operacoes.push({
            valor: investidor.valor, 
            tipo: investidor.tipo,
            data: moment().format('DD/MM/YYYY'),
        });

        if (investidor.tipo == 'CRED') {
            model.saldo = parseFloat(model.saldo) + parseFloat(investidor.valor);   
        } else {
            model.saldo = parseFloat(model.saldo) - parseFloat(investidor.valor);
        }        
        model.saldo = model.saldo + ',00';

        model = await db.update(model);        
        return model;
    },

    createAnotacao: async (investidor) => {
        if (!investidor.id) throw "Id é obrigatório";
        if (!investidor.conteudo) throw "Conteúdo é obrigatório";        

        let model = await db.getById(investidor.id);
        model.anotacoes.push({
            conteudo: investidor.conteudo,
            data: moment().format('DD/MM/YYYY'),
        });
        model = await db.update(model);        
        return model;
    },
}