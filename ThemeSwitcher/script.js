let botao = document.getElementById("botao")
let body = document.querySelector("body")

function alternarTema() {
	botao.classList.toggle("temaClaroBotao")
	body.classList.toggle("temaClaroBody")
}
