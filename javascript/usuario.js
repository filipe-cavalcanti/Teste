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

/* Validação do cadastro */

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
          title: 'Usuário já cadastrado!',
          color: '#ffffff',
          background: '#202020',
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
        title: 'Senhas diferentes!',
        color: '#ffffff',
        background: '#202020',
        showConfirmButton: false,
        timer: 1500,
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    } else if (usuarioValido) {
      Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Cadastro efetuado com sucesso!',
        color: '#ffffff',
        confirmButtonText: 'Logar',
        confirmButtonColor: '#008000',
        background: '#202020',
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
        title: 'Logando...',
        color: '#ffffff',
        background: '#202020',
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
      title: 'Login ou senha errados!',
      color: '#ffffff',
      background: '#202020',
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  }
}

/* Modo escuro */

const html = document.querySelector("body")
const checkbox = document.querySelector("input[name=tema]")

const getStyle = (element, style) =>
  window.getComputedStyle(element).getPropertyValue(style)

const initialColors = {
  colorText: getStyle(html, "--color-text"),
  border: getStyle(html, "--border"),
  background: getStyle(html, "--background")
}

const darkMode = {
  colorText: "#ffffff",
  border: "1px solid #ffffff",
  background: "#202020"
}

const transformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {
  Object.keys(colors).map(key => html.style.setProperty(transformKey(key), colors[key]))
}

checkbox.addEventListener("change", ({ target }) => {
  target.checked ? changeColors(darkMode) : changeColors(initialColors)
})

const isExistLocalStorage = (key) =>
  localStorage.getItem(key) != null

const createOrEditLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value))

const getValeuLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key))

checkbox.addEventListener("change", ({ target }) => {
  if (target.checked) {
    changeColors(darkMode)
    createOrEditLocalStorage('Modo', 'darkMode')
    document.querySelector("span.tema").innerHTML = "Tema claro"
    location.reload()
  } else {
    changeColors(initialColors)
    createOrEditLocalStorage('Modo', 'initialColors')
    document.querySelector("span.tema").innerHTML = "Tema escuro"
    location.reload()
  }
})

if (!isExistLocalStorage('Modo'))
  createOrEditLocalStorage('Modo', 'initialColors')

if (getValeuLocalStorage('Modo') === "initialColors") {
  checkbox.removeAttribute('checked')
  changeColors(initialColors);
  document.querySelector("span.tema").innerHTML = "Tema escuro"
} else {
  checkbox.setAttribute('checked', "")
  changeColors(darkMode);
  document.querySelector("span.tema").innerHTML = "Tema claro"
}