const repo = require('../repository/configuracao.repository');

module.exports = {

    get: async () => {
        let config = await repo.get();              
        if (!config) {     
            config = {                
                taxaInvestidor: '2',
                taxaEmprestimo: '2'
            };       
            config = await repo.create(config);
        }
        return config;        
    },

    save: async (configuracao) => {
        if (!configuracao.taxaInvestidor) {
            throw "TaxaInvestidor é obrigatório";
        }

        if (!configuracao.taxaEmprestimo) {
            throw "TaxaEmprestimo é obrigatório";
        }
        
        if (!configuracao._id) {
            return await repo.create(configuracao);
        } else {            
            return await repo.update(configuracao);
        }
    },

}