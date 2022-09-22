/* Cadastro, editar, excluir - Usuário */

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

const isValidFields = () => {
  return document.getElementById("formCadastroUsuario").reportValidity()
}

const clearFields = () => {
  const fields = document.querySelectorAll("#formCadastroUsuario")
  fields.forEach(field => field.value = "")
}

const saveUser = () => {
  if (isValidFields()) {
    const client = {
      usuario: document.getElementById("usuario").value,
      senha: document.getElementById("senha").value
    }
    creatUser(client)
    clearFields()
  }
}

/* Validação do cadastro de usuário */

function cadastroUsuraio() {

  const usuario = document.getElementById("usuario").value
  const senha = document.getElementById("senha").value
  const confirmarSenha = document.getElementById("confirmarSenha").value
  let usuarioValido = true

  if (isValidFields()) {
    for (let i = 0; i < getLocalStorage().length; i++) {
      if (getLocalStorage()[i].usuario == usuario) {
        usuarioValido = false
        Swal.fire({
          toast: true,
          icon: 'error',
          iconColor: '#f27474',
          title: 'Usuário já cadastrado!',
          color: '#fefefe',
          background: 'var(--color-text-details)',
          showConfirmButton: false,
          timer: 1500,
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      }
    } if (senha != confirmarSenha) {
      Swal.fire({
        toast: true,
        icon: 'warning',
        iconColor: '#f8bb86',
        title: 'Senhas diferentes!',
        color: '#fefefe',
        background: 'var(--color-text-details)',
        showConfirmButton: false,
        timer: 1500,
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    } else if (usuarioValido) {
      Swal.fire({
        toast: true,
        icon: 'success',
        iconColor: '#a5dc86',
        title: 'Cadastro efetuado com sucesso!',
        color: 'var(--color-text-default)',
        confirmButtonText: 'Logar',
        confirmButtonColor: 'var(--btn-green)',
        background: 'var(--color-text-details)',
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
}

/* Validação de login */

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
        iconColor: '#a5dc86',
        title: 'Logando...',
        color: '#fefefe',
        background: 'var(--color-text-details)',
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
      iconColor: '#f8bb86',
      title: 'Login ou senha errados!',
      color: '#fefefe',
      background: 'var(--color-text-details)',
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  }
}