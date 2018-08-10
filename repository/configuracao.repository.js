const Configuracao = require("../model/configuracao.model");

module.exports = {

    get: () => {
        return new Promise(res => {
            Configuracao
                .findOne((err, doc) => {                    
                    res(doc);
                });
        });
    },

    create: (config) => {
        return new Promise(res => {
            let db = new Configuracao(config);
            db.id = db._id;            
            res(db.save());
        });
    },

    update: (config) => {
        return new Promise(res => {
            Configuracao.update(config, (err, doc) => {                
                return doc != null ? res(config) : res(null);
            });
        });
    },
}