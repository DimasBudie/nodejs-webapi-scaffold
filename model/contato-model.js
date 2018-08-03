const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var userDataSchema = new Schema({
  nome: String,
  email: String,
  telefone: String
}, { collection: 'contatos' });

module.exports = mongoose.model('Contato', userDataSchema);