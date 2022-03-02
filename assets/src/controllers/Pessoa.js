import { Pessoa } from "../model/Pessoa.js";
import { db } from "../db/db.js";

class PessoaControle {
  static cadastrarPessoa(teste) {
    const newPessoa = new Pessoa(teste);
    db.cadastros.push(newPessoa);

    return db.cadastros;
  }
}

export { PessoaControle };
