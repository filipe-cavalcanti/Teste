/* Cadastro, editar, excluir - Cliente */

const getLocalStorage = () => JSON.parse(localStorage.getItem('Cliente')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("Cliente", JSON.stringify(dbClient))

const deleteClient = (index) => {
  const dbClient = readClient()
  dbClient.splice(index, 1)
  setLocalStorage(dbClient)
}

const updateClient = (index, client) => {
  const dbClient = readClient()
  dbClient[index] = client
  setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const creatClient = (client) => {
  const dbClient = getLocalStorage()
  dbClient.push(client)
  setLocalStorage(dbClient)
}

const clearFields = () => {
  const fields = document.querySelectorAll(".formCadastro")
  fields.forEach(field => field.value = "")
}

const saveClient = () => {
  const client = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("e-mail").value,
    setor: document.querySelector("input[type='checkbox']:checked").value
  }
  const index = document.getElementById("nome").dataset.index
  if (index == "new") {
    creatClient(client)
    updateTable()
    clearFields()
    Swal.fire({
      icon: 'success',
      title: `Cliente ${client.nome} cadastrado com sucesso!`,
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  } else {
    updateClient(index, client)
    updateTable()
    clearFields()
    Swal.fire({
      icon: 'success',
      title: `Cliente ${client.nome} atualizado com sucesso!`,
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  }
}

const creatRow = (client, index) => {
  const newRow = document.createElement("div")
  newRow.classList.add("clientes")
  newRow.innerHTML = `<p class="lead">${client.nome}</p> 
                      <p class="lead">${client.telefone}</p> 
                      <p class="lead">${client.email}</p>
                      <p class="lead">${client.setor}</p>
                      <p class="editarExcluir">
                        <button type="button" class="editar" id="edit-${index}">Editar</button> 
                        <button type="button" class="excluir" id="delete-${index}">Excluir</button>
                      </p>`
  document.querySelector("#clientes").appendChild(newRow)
}

const clearTable = () => {
  const rows = document.querySelectorAll("#clientes>div")
  rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
  const dbClient = readClient()
  clearTable()
  dbClient.forEach(creatRow)
}

const fillFields = (client) => {
  document.getElementById("nome").value = client.nome
  document.getElementById("telefone").value = client.telefone
  document.getElementById("e-mail").value = client.email
  document.getElementById("nome").dataset.index = client.index
}

const editClient = (index) => {
  const client = readClient()[index]
  client.index = index
  fillFields(client)
}

const editDelete = (event) => {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-")
    if (action == "edit") {
      const client = readClient()[index]
      Swal.fire({
        icon: 'question',
        iconColor: '#FFBF00',
        title: `Deseja editar o cliente ${client.nome}`,
        confirmButtonText: 'Sim',
        confirmButtonColor: '#008000',
        cancelButtonText: 'Não',
        cancelButtonColor: '#FF0000',
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          editClient(index)
          updateTable()
        }
      })
    } else {
      const client = readClient()[index]
      Swal.fire({
        icon: 'question',
        iconColor: '#FFBF00',
        title: `Deseja excluir o cliente ${client.nome}`,
        confirmButtonText: 'Sim',
        confirmButtonColor: '#008000',
        cancelButtonText: 'Não',
        cancelButtonColor: '#FF0000',
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          deleteClient(index)
          updateTable()
        }
      })
    }
  }
}

updateTable()

document.querySelector("#clientes").addEventListener("click", editDelete)

/* Validação usuario

function usuarioLogado() {
  const loginUsuario = document.getElementById("usuario").value

  for (let i = 0; i < getLocalStorage().length; i++) {
    if (getLocalStorage()[i].usuario) {
      localStorage.setItem("Usuario", usuario)
      loginUsuario.getElementById("usuarioLogado").innerHTML = "Seja"
    }
  }

}*/


/* Validação login */

let logado = false;

if (localStorage.getItem("Acesso") == "true") {
  logado = true;
} else if (logado != true) {
  location.href = "index.html"
}

/* Validação logout */

function logout() {
  if (logado == true) {
    Swal.fire({
      toast: true,
      icon: 'warning',
      iconColor: '#ffffff',
      title: 'Deseja sair?',
      confirmButtonText: 'Sim',
      confirmButtonColor: '#008000',
      cancelButtonText: 'Não',
      cancelButtonColor: '#FF0000',
      background: '#f8bb86',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("Acesso", false)
        location.href = "index.html"
      }
    })
  }
}

/* Validação cadastro clientes */

function cadastroClientes() {

  const nome = document.getElementById("nome").value
  const telefone = document.getElementById("telefone").value
  const email = document.getElementById("e-mail").value

  if (nome == "" || telefone == "" || email == "") {
    Swal.fire({
      icon: 'warning',
      iconColor: '#FFBF00',
      title: 'Insira os dados do Cliente!',
      background: '#f8bb86',
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  } else {
    Swal.fire({
      icon: 'question',
      iconColor: '#FFBF00',
      title: 'Deseja salvar o cliente?',
      confirmButtonText: 'Sim',
      confirmButtonColor: '#008000',
      cancelButtonText: 'Não',
      cancelButtonColor: '#FF0000',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        saveClient()
      }
    })
  }
}

/* Mascara do input - Telefone */

function mascaraTelefone(event) {
  let telefone = document.getElementById("telefone").attributes[0].ownerElement['value'];
  let retorno = telefone.replace(/\D/g, "");
  retorno = retorno.replace(/^0/, "");
  if (retorno.length > 10) {
    retorno = retorno.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (retorno.length > 5) {
    if (retorno.length == 6 && event.code == "Backspace") {
      return;
    }
    retorno = retorno.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (retorno.length > 2) {
    retorno = retorno.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    if (retorno.length != 0) {
      retorno = retorno.replace(/^(\d*)/, "($1");
    }
  }
  document.getElementById("telefone").attributes[0].ownerElement['value'] = retorno;
}

/* Tabela oportunidades (checkbox) */

function marcaDesmarca(caller) {
  let checks = document.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < checks.length; i++) {
    checks[i].checked = checks[i] == caller;
  }
}