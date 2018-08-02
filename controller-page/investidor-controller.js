
let investidorController = {

    /**
     * Renderiza a pagina inicial.
     */
    index: (req, res) => {
        res.render('pages/investidor-lista');
    },

    /**
     * Retorna a pagina de detalhes do investidor.
     */
    detalhe: (req, res) => {
        res.render('pages/investidor-detalhe');
    },

}

module.exports = investidorController;