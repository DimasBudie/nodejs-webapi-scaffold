let httpResponseHelper = {

    badRequest: function (res, message) {
        res.status(400);
        res.json({ "message": message });
    },

    internalError: function (res, message, error) {
        res.status(500);
        res.json({ "message": message, "error" : error });
    },

    notFound: function (res, message) {
        res.status(400);
        res.json({ "message": message });
    },

    ok: function (res, message) {
        res.status(201);
        res.json({ "message": message });
    },

    data: function (res, data) {
        res.status(200);
        res.json(data);
    },

}

module.exports = httpResponseHelper;
