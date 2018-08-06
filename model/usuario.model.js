const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let dataSchema = new Schema({
  nome: String,
  email: String,
  usuario: String,
  senha: String
}, { collection: 'usuarios' });

module.exports = mongoose.model('Usuario', dataSchema);