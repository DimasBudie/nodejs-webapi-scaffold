module.exports = {

  getAll: (req, res) => {
    res.json('[{}]');
  },

  getOne: (req, res) => {
    var id = req.params.id;
    res.json('{}');
  },

  create: (req, res) => {
    let product = req.body;
    res.json('{}');
  },

  update: (req, res) => {
    var product = req.body;
    product.id = req.params.id;
    res.json('{}');
  },

  delete: (req, res) => {
    var id = req.params.id;
    res.json(true);
  }
};