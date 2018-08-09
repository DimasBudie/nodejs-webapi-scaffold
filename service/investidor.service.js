const db = require('../repository/investidor.repository');
const configService = require('../service/configuracao.service');
const math = require('mathjs');

function getLastItem(list) {
    return list.slice(-1)[0];
}

module.exports = {

    save: async (investidor) => {
        if (!investidor.nome) throw "Nome é obrigatório";
        if (!investidor.taxa) throw "Taxa é obrigatório";
        if (!investidor.operacoes) throw "Operação é obrigatório";

        if (!investidor.id) {
            if (!investidor.cpf) throw "Cpf é obrigatório";
            
            // Por default o saldo inicial é o valor do primeiro deposito.
            investidor.saldo = investidor.operacoes[0].valor;            
            let model = await db.create(investidor);            
            
            return model;
        } else {
            let model = await db.getById(investidor.id);

            let ultimaOperacao = getLastItem(investidor.operacoes);
            if (ultimaOperacao.valor > 0) {
                model.operacoes.push(ultimaOperacao.valor);      
            }            
            model.nome = investidor.nome;
            model.taxaInvestidor = investidor.taxaInvestidor;         
            
            return await db.update(model);
        }
    },

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

}