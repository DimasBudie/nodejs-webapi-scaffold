const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let dataSchema = new Schema({
  nome: { type: String, default: '' },
  email: { type: String, default: '' },
  usuario: { type: String, default: '' },
  senha: { type: String, default: '' },
}, { collection: 'Usuario' });

module.exports = mongoose.model('Usuario', dataSchema);