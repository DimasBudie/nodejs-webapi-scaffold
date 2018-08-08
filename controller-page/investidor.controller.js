let service = require('../service/investidor.service');

module.exports = {

    index: async (req, res) => {
        let list = await service.getAll();
        res.render('pages/investidor-lista', {list : list});
    },

    create: async (req, res) => {
        let input = req.body;
        await service.create({
            nome: input.nome,
            taxa: input.taxa,
            cpf: input.cpf,   
            saldo : '0',
            operacoes: [{
              valor : input.valor,
              tipo : input.tipo
            }]
        })

        let list = await service.getAll();
        res.render('pages/investidor-lista', {list : list});
    },

}