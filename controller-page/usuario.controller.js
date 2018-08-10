const service = require('../service/usuario.service');

module.exports = {

    index: (req, res) => {
        res.render('pages/login', { isAuthValid: true });
    },

    login: async (req, res) => {
        let input = req.body;

        if (!input.username || !input.password) {
            res.render('pages/login', { isAuthValid: false });
        }

        var data = await service.getByLogin(input.username, input.password);
        if (data != null) {
            req.session.user = data.usuario;
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
        //if (req.session && req.session.user === "admin" && req.session.admin)
        if (req.session && req.session.admin)
            return next();
        else
            res.render('pages/login', { isAuthValid: true });
    },

    logout: (req, res) => {
        req.session.destroy();
        res.render('pages/login', { isAuthValid: true });
    },

}; 