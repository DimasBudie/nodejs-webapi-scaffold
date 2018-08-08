const Configuracao = require("../model/configuracao.model");

module.exports = {

    getAll: () => {
        return new Promise(res => {
            Configuracao
                .find((err, doc) => {
                    res(doc);
                });
        });
    },

    create: (investidor) => {
        var db = new Investidor(investidor);
        db.create();
    },

    update: (investidor) => {
        var db = new Investidor(investidor);
        db.update();
    },
}