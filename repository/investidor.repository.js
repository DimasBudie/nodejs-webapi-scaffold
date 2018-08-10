const Investidor = require("../model/investidor.model");

module.exports = {

    create: (investidor) => {
        return new Promise(res => {            
            let db = new Investidor(investidor);
            db.id = db._id;            
            res(db.save());
        });
    },

    update: (investidor) => {
        return new Promise(res => {
            Investidor.update({'id' : investidor.id}, investidor, (err, doc) => {                
                return doc != null ? res(investidor) : res(null);
            });
        });
    },

    getAll: () => {
        return new Promise(res => {
            Investidor
                .find((err, doc) => {
                    res(doc);
                });
        });
    },

    getById: (id) => {
        return new Promise(res => {
            Investidor
                .findOne({ 'id': id }, (err, doc) => {
                    res(doc);
                });
        });
    },
}