const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let dataSchema = new Schema({
  nome: String,     // João da Silva
  email: String,    // joao@gmail.com
  usuario: String,  // j.silva
  senha: String     // 123456
}, { collection: 'Usuario' });

module.exports = mongoose.model('Usuario', dataSchema);