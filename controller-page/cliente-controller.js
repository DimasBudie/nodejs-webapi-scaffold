
let clienteController = {

    /**
     * Renderiza a pagina inicial.
     */
    index: (req, res) => {
        res.render('pages/cliente-lista');
    },

    /**
     * Pesquisa cliente com base no id informado e retorna
     * pagina de detalhes.
     */
    detalhe: (req, res) => {
        res.render('pages/cliente-detalhe');
    },

}

module.exports = clienteController;