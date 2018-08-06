let Usuario = require("../model/usuario.model");

module.exports = {

    findByLogin: (usuario, senha) => {
        return new Promise(res => {
            Usuario
                .where('usuario', usuario)
                .where('senha', senha)
                .exec((err, doc) => {
                    if (!doc) {
                        res(null)
                    } else {
                        res(doc[0]);
                    }
                });
        });
    },

    findByUsername: (username) => {
        return new Promise(res => {
            Usuario
                .where('usuario', username)
                .exec((err, doc) => {
                    if (!doc) {
                        res(null)
                    } else {
                        res(doc[0]);
                    }
                });
        });
    },
}