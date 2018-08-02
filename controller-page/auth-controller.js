
let authController = {

    /**
     * Renderiza a pagina inicial.
     */
    index: (req, res) => {
        res.render('pages/login', { isAuthValid: true });
    },

    /**
     * Valida usuário e senha informados, autentica uma nova sessão
     * e redireciona para a home do sistema.
     */
    login: (req, res) => {
        let input = req.body;

        if (!input.username || !input.password) {
            res.render('pages/login', { isAuthValid: false });
        }

        if (input.username == 'admin' && input.password == 'admin') {
            req.session.user = input.username;
            req.session.admin = true;
            res.render('pages/home');
        } else {
            res.render('pages/login', { isAuthValid: false });
        }
    },

    /**
     * Middleware de autenticação usado para validar os requests
     * na area restrita do sistema, todo request que utilizar esse
     * método recebe uma validação de sessão antes de prosseguir.
     */
    validateAuth: (req, res, next) => {
        if (req.session && req.session.user === "admin" && req.session.admin)
            return next();
        else
            res.render('pages/login', { isAuthValid: true });
    },

    /**
     * Encerra a sessão do usuário e redireciona para a pagina de login.
     */
    logout : (req, res) => {
        req.session.destroy();
        res.render('pages/login', { isAuthValid: true });
    },

}

module.exports = authController;