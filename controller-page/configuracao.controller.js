const service = require('../service/configuracao.service');

module.exports = {

    // Renderiza a pagina inicial.
    index: async (req, res) => {
        let config = await service.get();
        res.render('pages/configuracao', { config: config, msg : null });
    },

    // Salva as configuracoes do sistema.
    save: async (req, res) => {
        let input = req.body;
        let data = await service.save({
            _id: input._id,
            taxaInvestidor: input.taxaInvestidor,
            taxaEmprestimo: input.taxaEmprestimo,
        });

        if (data == null) {
            res.render('pages/configuracao', { config: data, msg : 'Erro ao realizar operação.' });
        } else {            
            res.render('pages/configuracao', { config: data, msg : 'Operação realizada com sucesso.' });
        }
    },
};