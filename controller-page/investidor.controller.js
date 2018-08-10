const service = require('../service/investidor.service');
const config = require('../appconfig');

module.exports = {

    renderIndex: async (req, res) => {
        res.render('pages/investidor-index', {
            data: await service.getAll(),
            msg: null
        });
    },

    renderNew: async (req, res) => {
        res.render('pages/investidor-new', {
            data: await service.getDetault(),
            msg: null
        });
    },

    renderEdit: async (req, res) => {
        let input = req.params;
        res.render('pages/investidor-detail', {
            data: await service.getById(input.id),
            msg: null
        });
    },

    create: async (req, res) => {
        let input = req.body;
        try {                                    
            let data = await service.create({
                nome: input.nome,
                taxa: input.taxa,
                cpf: input.cpf
            });

            res.render('pages/investidor-detail', {
                data: data,
                msg: null
            });
        } catch (error) {
            res.render('pages/investidor-new', {
                data: input,
                msg: error
            });
        }
    },

    updateDadoBasico: async (req, res) => {
        let input = req.body;
        try {
            let data = await service.updateDadoBasico({
                id: input.id,
                nome: input.nome,
                taxa: input.taxa,
                cpf: input.cpf
            });
    
            res.render('pages/investidor-detail', {
                data: data,
                msg: config.okMessage
            });
        } catch (error) {
            res.render('pages/investidor-detail', {
                data: input,
                msg: error
            }); 
        }
    },

    createLancamento: async (req, res) => {
        let input = req.body;
        try {
            let data = await service.createLancamento({
                id: input.id,
                valor: input.valor,
                tipo: input.tipo,                
            });
    
            res.render('pages/investidor-detail', {
                data: data,
                msg: config.okMessage
            });
        } catch (error) {
            res.render('pages/investidor-detail', {
                data: input,
                msg: error
            }); 
        }
    },

    createAnotacao: async (req, res) => {
        let input = req.body;        
        try {
            let data = await service.createAnotacao({
                id: input.id,
                conteudo: input.conteudo             
            });
    
            res.render('pages/investidor-detail', {
                data: data,
                msg: config.okMessage
            });
        } catch (error) {
            res.render('pages/investidor-detail', {
                data: input,
                msg: error
            }); 
        }
    },

}