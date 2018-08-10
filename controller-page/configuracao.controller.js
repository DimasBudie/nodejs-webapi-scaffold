const configService = require('../service/configuracao.service');
const usuarioService = require('../service/usuario.service');
const config = require('../appconfig');
const data = { usuario: null, config: null };

module.exports = {

    // Renderiza a pagina inicial.
    index: async (req, res) => {
        data.usuario = req.session.user;
        data.config = await configService.get();

        res.render('pages/configuracao', {
            data: data,
            msg: null
        });
    },

    updatePassword: async (req, res) => {
        let input = req.body;
        try {
            data.usuario = req.session.user;
            data.config = await usuarioService.updatePassword({
                usuario: input.usuario,
                senhaAntiga: input.senhaAntiga,
                novaSenha: input.novaSenha,
                novaSenhaRepete: input.novaSenhaRepete
            });

            res.render('pages/configuracao', {
                data: data,
                msg: config.okMessage
            });
        } catch (error) {
            res.render('pages/configuracao', {
                data: data,
                msg: error
            });
        }
    },
    
    updateJuros: async (req, res) => {
        let input = req.body;
        try {
            data.config = await configService.updateJuros({
                id: input.id,
                taxaInvestidor: input.taxaInvestidor,
                taxaEmprestimo: input.taxaEmprestimo,
            });

            res.render('pages/configuracao', {
                data: data,
                msg: config.okMessage
            });
        } catch (error) {
            res.render('pages/configuracao', {
                data: data,
                msg: error
            });
        }
    },

};