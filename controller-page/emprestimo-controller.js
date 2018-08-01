
let emprestimoController = {

    /**
     * Retorna a pagina inicial.
     */
    index: (req, res) => {
        res.render('pages/emprestimo-lista');
    },

    /**
     * Retorna a pagina para criar novos empréstimos.
     */
    novo: (req, res) => {
        res.render('pages/emprestimo-novo');
    },

    /**
     * Retorna a pagina para simular um empréstimo.
     */
    simulador: (req, res) => {
        res.render('pages/emprestimo-simula');
    },

    /**
     * Retorna a pagina de detalhamento de empréstimos com base
     * no identificador informado.
     */
    detalhe: (req, res) => {
        res.render('pages/emprestimo-detalhe');
    },
}

module.exports = emprestimoController;