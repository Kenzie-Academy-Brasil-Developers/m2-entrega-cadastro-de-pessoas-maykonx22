import { PessoaControle } from "./controllers/Pessoa.js";
import { db } from "../src/db/db.js";

const cadastroPessoa = document.querySelector("body");
const listaPessoa = [];

cadastroPessoa.addEventListener("submit", (event) => {
  event.preventDefault();

  const evento = event.target;
  const data = {};

  for (let i = 0; i < evento.length; i++) {
    const { name, value, email } = evento[i];

    /* Pegar o Valor da Data de Nascimento */
    if (name === "dataNascimento") {
      let dataAtual = new Date().getFullYear();
      let dataNasc = new Date(value).getFullYear();

      /* Verificar se é Maior de 18 */
      if (dataAtual - dataNasc >= 18) {
        /* Pegar o Valor do Email */
        for (let j = 0; j < evento.length; j++) {
          const { name, value, email } = evento[j];

          /* Verificar se o email ja Existe Chamando a Função testeEmail */
          if (testeEmail(listaPessoa.length, value) === false) {
            if (name === "email") {
              if (listaPessoa.length > 0) {
                for (let k = 0; k < evento.length; k++) {
                  const { name, value } = evento[k];
                  data[name] = value;
                }
                listaPessoa.push(PessoaControle.cadastrarPessoa(data));
                MostrarPesssoas(listaPessoa);
              } else {
                for (let i = 0; i < evento.length; i++) {
                  const { name, value } = evento[i];
                  data[name] = value;
                }
                listaPessoa.push(PessoaControle.cadastrarPessoa(data));
                MostrarPesssoas(listaPessoa);
              }
            }
          } else {
            return alert("Esse Email ja Existe!");
          }
        }
      } else {
        return alert("Somente Maiores de 18 Anos que pode se Cadastrar!");
      }
    }
  }
});

// Função Para Verificar o email
function testeEmail(lista, dataEmail) {
  for (let k = 0; k < lista; k++) {
    for (let l = 0; l < lista; l++) {
      if (listaPessoa[k][l]._email === dataEmail) {
        return true;
      }
    }
  }
  return false;
}

const dbPessoas = document.querySelector("#lista-de-alunos");
const quantLista = document.querySelector("#total-alunos");

const cargos = document.querySelector("#cargoOption");

//Função para montar a Lista de Nomes
function MostrarPesssoas(lista) {
  cargos.value = "Todos";
  dbPessoas.innerHTML = "";
  quantLista.innerText = lista.length;

  for (let i = 0; i < lista.length; i++) {
    const { _nome, _sobrenome, _email, _cargo } = lista[i][i];
    const li = document.createElement("li");
    const olNome = document.createElement("p");
    const olEmail = document.createElement("p");
    const olCargo = document.createElement("p");

    li.id = lista[i][i].id;

    olNome.innerText = `${_nome} ${_sobrenome}`;
    olEmail.innerText = _email;
    olCargo.innerText = _cargo;

    li.appendChild(olNome);
    li.appendChild(olEmail);
    li.appendChild(olCargo);

    dbPessoas.appendChild(li);
  }
}

const bnt = document.querySelector("#btn");

function MostrarFiltro(filtro) {
  dbPessoas.innerHTML = "";

  for (let i = 0; i < filtro.length; i++) {
    const { _nome, _sobrenome, _email, _cargo } = filtro[i];
    const li = document.createElement("li");
    const olNome = document.createElement("p");
    const olEmail = document.createElement("p");
    const olCargo = document.createElement("p");

    li.id = filtro[i].id;

    olNome.innerText = `${_nome} ${_sobrenome}`;
    olEmail.innerText = _email;
    olCargo.innerText = _cargo;

    li.appendChild(olNome);
    li.appendChild(olEmail);
    li.appendChild(olCargo);

    dbPessoas.appendChild(li);
  }
}

bnt.addEventListener("click", function (event) {
  switch (cargos.value) {
    case "Todos":
      MostrarPesssoas(listaPessoa);
      break;
    case "Aluno":
      const newArrayAluno = [];
      for (let i = 0; i < db.cadastros.length; i++) {
        if (db.cadastros[i]._cargo === cargos.value) {
          newArrayAluno.push(db.cadastros[i]);
        }
      }
      MostrarFiltro(newArrayAluno);
      break;
    case "Facilitador":
      const newArrayFacilitador = [];
      for (let i = 0; i < db.cadastros.length; i++) {
        if (db.cadastros[i]._cargo === cargos.value) {
          newArrayFacilitador.push(db.cadastros[i]);
        }
      }
      MostrarFiltro(newArrayFacilitador);
      break;
    case "Instrutor":
      const newArrayInstrutor = [];
      for (let i = 0; i < db.cadastros.length; i++) {
        if (db.cadastros[i]._cargo === cargos.value) {
          newArrayInstrutor.push(db.cadastros[i]);
        }
      }
      MostrarFiltro(newArrayInstrutor);
      break;
  }
});
