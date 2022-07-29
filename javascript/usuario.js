/* Cadastro usuario */

const getLocalStorage = () => JSON.parse(localStorage.getItem('Usuario')) ?? []
const setLocalStorage = (dbUser) => localStorage.setItem("Usuario", JSON.stringify(dbUser))

const deleteUser = (index) => {
  const dbUser = readUser()
  dbUser.splice(index, 1)
  setLocalStorage(dbUser)
}

const updateUser = (index, client) => {
  const dbUser = readUser()
  dbUser[index] = client
  setLocalStorage(dbUser)
}

const readUser = () => getLocalStorage()

const creatUser = (client) => {
  const dbUser = getLocalStorage()
  dbUser.push(client)
  setLocalStorage(dbUser)
}

const clearFields = () => {
  const fields = document.querySelectorAll("#formCadastroUsuario")
  fields.forEach(field => field.value = "")
}

const saveUser = () => {
  const client = {
    usuario: document.getElementById("usuario").value,
    senha: document.getElementById("senha").value
  }
  creatUser(client)
  clearFields()
}

/* Validação do cadastro */

function cadastroUsuraio() {

  const usuario = document.getElementById("usuario").value
  const senha = document.getElementById("senha").value
  const confirmarSenha = document.getElementById("confirmarSenha").value
  let usuarioInvalido = true

  for (let i = 0; i < getLocalStorage().length; i++) {
    if (getLocalStorage()[i].usuario == usuario) {
      usuarioInvalido = false
      Swal.fire({
        toast: true,
        icon: 'warning',
        iconColor: '#ffffff',
        title: 'Usuário já cadastrado!',
        background: '#f8bb86',
        showConfirmButton: false,
        timer: 1500,
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
  } if (usuario == "" || senha == "" || confirmarSenha == "") {
    Swal.fire({
      toast: true,
      icon: 'warning',
      iconColor: '#ffffff',
      title: 'Insira o usuário e senha!',
      background: '#f8bb86',
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  } else if (senha != confirmarSenha) {
    Swal.fire({
      toast: true,
      icon: 'warning',
      iconColor: '#ffffff',
      title: 'Senhas diferentes!',
      background: '#f8bb86',
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  } else if (usuarioInvalido) {
    Swal.fire({
      toast: true,
      icon: 'success',
      title: 'Cadastro efetuado com sucesso!',
      confirmButtonText: 'Logar',
      confirmButtonColor: '#008000',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        saveUser()
        location.href = "index.html"
      }
    })
  }
}

/* Validação login */

function validarLogin() {

  const loginUsuario = document.getElementById("usuario").value
  const loginSenha = document.getElementById("senha").value
  let loginInvalido = true

  for (let i = 0; i < getLocalStorage().length; i++) {
    if (getLocalStorage()[i].usuario == loginUsuario && getLocalStorage()[i].senha == loginSenha) {
      loginInvalido = false
      localStorage.setItem("Acesso", true)
      Swal.fire({
        toast: true,
        icon: 'success',
        iconColor: '#ffffff',
        title: 'Logando...',
        background: '#a5dc86',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isDismissed) {
          location.href = "clientes.html"
        }
      })
    }
  } if (loginInvalido) {
    Swal.fire({
      toast: true,
      icon: 'warning',
      iconColor: '#ffffff',
      title: 'Login ou senha errados!',
      background: '#f8bb86',
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  }
}