const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Operacao = new Schema({
  data: String,   // 10/08/2018
  valor: String,  // 1.000,00
  tipo: String    // CRED, DEBT
});

let Investidor = new Schema({
  id: String,
  nome: String,   // João da Silva
  taxa: String,   // 1.5
  cpf: String,    // 040.654.986-87
  saldo: String,  // 1.000,00
  operacoes: [Operacao]
}, { collection: 'Investidor' });

module.exports = mongoose.model('Investidor', Investidor);