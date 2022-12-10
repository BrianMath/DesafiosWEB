// Conjunto dos campos e quantidade deles
let campos = document.querySelector("#campos")
let input = document.querySelector("#qtdBotoes")
let escolhaBotoes = document.querySelector("#escolhaBotoes")
let matrizCampos = [1, 0, 0, 0, 0, 0, 0, 0, 1] // matriz 3x3

// Atalho pra imprimir no console
function print(texto) {
	console.log(texto)
}

// Event listener no input
input.addEventListener("keydown", (event) => {
	if (event.key == "Enter") {
		criarBotoes()
	}	
})

// Função de clicar em um campo
function clicarCampo(posCampo) {
	if (matrizCampos[posCampo] == 0) {
		print("Vazio")
	} else {
		print("Bomba")
	}
}

// Cria os botões e adiciona suas funções com os respectivos argumentos de posição
function criarBotoes() {
	// Prevenção de erro
	if (Number(input.value) <= 0) {
		alert("Valor deve ser positivo!")
		return
	}

	// Limpa a escolha de botões
	escolhaBotoes.innerHTML = ""

	// Cria os botões
	for (let i = 0; i < input.value; i++) {
		let campo = document.createElement("button")
		
		campo.id = i
		campo.textContent = i + 1
		campo.addEventListener("click", function() {
			// Atribui o argumento específico para cada botão
			clicarCampo(i)
		})
		
		// Adiciona o botão ao HTML
		campos.appendChild(campo)
	}
}