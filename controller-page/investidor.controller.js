const service = require('../service/investidor.service');
const config = require('../appconfig');
const moment = require('moment');

module.exports = {

    renderIndex: async (req, res) => {        
        res.render('pages/investidor-index', { 
            data: await service.getAll(),
            msg: null
        });
    },

    renderNew: async (req, res) => {
        res.render('pages/investidor-detail', {
            data: await service.getDetault(), 
            msg: null
        });
    },

    renderEdit: async (req, res) => {
        let input = req.params;  
        res.render('pages/investidor-detail',{
            data: await service.getById(input.id), 
            msg: null
        });
    },
    
    create: async (req, res) => {
        let input = req.body;
        let data = await service.save({
            id : input.id,
            nome: input.nome,
            taxa: input.taxa,
            cpf: input.cpf,
            saldo: '0',
            operacoes: [{
                valor: input.operacoes.valor,
                tipo: input.operacoes.tipo,
                data: moment().format('DD/MM/YYYY')
            }]
        });

        res.render('pages/investidor-detail', {
            data: data, 
            msg: data._id != null ? config.okMessage : config.errorMessage
        });
    },

}