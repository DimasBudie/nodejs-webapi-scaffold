const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let dataSchema = new Schema({
  taxaInvestidor: String,   // 1.5
  taxaEmprestimo: String,   // 3
}, { collection: 'Configuracao' });

module.exports = mongoose.model('Configuracao', dataSchema);