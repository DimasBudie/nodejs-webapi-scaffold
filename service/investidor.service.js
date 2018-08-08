const db = require('../repository/investidor.repository');
const math = require('mathjs');

module.exports = {

    create: async (investidor) => {
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

        // investidor.saldo =
        //     parseFloat(investidor.saldo) +
        //     parseFloat(investidor.operacoes[0].valor);

        console.log(investidor)
        investidor.saldo = math.chain(investidor.saldo)
                               .add(investidor.operacoes[0].valor)
                               .done();

        return await db.create(investidor);
    },

    getAll: async () => {
        return await db.getAll();
    },

    getByCpf: async (cpf) => {
        if (!cpf) {
            throw "Cpf é obrigatório";
        }

        return await db.getByCpf(cpf);
    },

}