
let investidorController = {

    /**
     * Renderiza a pagina inicial.
     */
    index: (req, res) => {
        res.render('pages/investidor-lista');
    },

}

module.exports = investidorController;