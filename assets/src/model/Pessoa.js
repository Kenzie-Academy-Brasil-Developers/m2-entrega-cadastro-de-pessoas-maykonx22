import { db } from "../db/db.js";

class Pessoa {
  constructor({
    nome,
    sobrenome,
    dataNascimento,
    email,
    contato,
    telefone,
    cargo,
  }) {
    this.id = Pessoa.pessoaId();
    this._nome = nome;
    this._sobrenome = sobrenome;
    this._dataNascimento = dataNascimento;
    this._email = email;
    this._contato = contato;
    this._telefone = telefone;
    this._cargo = cargo;
  }

  static pessoaId() {
    let maxId = 0;
    db.cadastros.forEach((element) => {
      if (element.id > maxId) {
        maxId = element.id;
      }
    });

    return maxId + 1;
  }
}

export { Pessoa };
