
let homeController = {

    /**
     * Renderiza a pagina inicial.
     */
    index: (req, res) => {
        res.render('pages/home');
    },

}

module.exports = homeController;