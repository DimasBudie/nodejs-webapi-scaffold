const Usuario = require("../model/usuario.model");

module.exports = {

    getByLogin: (usuario, senha) => {
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

    getByUsername: (username) => {
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

    update: (usuario) => {
        return new Promise(res => {
            Usuario.update({'usuario' : usuario.usuario}, usuario, (err, doc) => {                
                return doc != null ? res(usuario) : res(null);
            });
        });
    },
}