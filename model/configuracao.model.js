const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let dataSchema = new Schema({
  id: String,
  taxaInvestidor: { type: String, default: '' },
  taxaEmprestimo: { type: String, default: '' },
}, { collection: 'Configuracao' });

module.exports = mongoose.model('Configuracao', dataSchema);