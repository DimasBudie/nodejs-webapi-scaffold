const Investidor = require("../model/investidor.model");

module.exports = {

    create: (investidor) => {
        var db = new Investidor(investidor);
        db.save();
    },

    getAll: () => {
        return new Promise(res => {
            Investidor
                .find((err, doc) => {
                    res(doc);
                });
        });
    },

    getByCpf: (cpf) => {
        return new Promise(res => {
            Investidor
                .findOne({ 'cpf': cpf }, (err, doc) => {
                    return doc;
                });
        });
    },
}