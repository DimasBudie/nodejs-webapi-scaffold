const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Operacao = new Schema({
  data: { type: String, default: '' },
  valor: { type: String, default: '0,00' },
  tipo: { type: String, default: 'CRED' }    // CRED, DEBT
});

let Anotacao = new Schema({
  data: { type: String, default: '' },
  conteudo: { type: String, default: '' },
});

let Investidor = new Schema({
  id: String,
  nome: { type: String, default: '' },
  taxa: { type: String, default: '0' },
  cpf: { type: String, default: '' },
  saldo: { type: String, default: '0,00' },
  operacoes: { type: [Operacao], default: [] },
  anotacoes: { type: [Anotacao], default: [] },
}, { collection: 'Investidor' });

module.exports = mongoose.model('Investidor', Investidor);