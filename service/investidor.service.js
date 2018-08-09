const db = require('../repository/investidor.repository');
const configService = require('../service/configuracao.service');
const math = require('mathjs');

function getLastItem(list){
    return list.slice(-1)[0];
}

module.exports = {

    save: async (investidor) => {
        if (!investidor.nome) {
            throw "Nome é obrigatório";
        }

        if (!investidor.taxa) {
            throw "Taxa é obrigatório";
        }

        if (!investidor.cpf) {
            throw "Cpf é obrigatório";
        }
        
        if (!investidor.operacoes) {
            throw "Operação é obrigatório";
        }
        
        if (!investidor.id) {
            return await db.create(investidor);
        } else {            
            let model = await db.getById(investidor.id);
            model.operacoes.push(getLastItem(investidor.operacoes));
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