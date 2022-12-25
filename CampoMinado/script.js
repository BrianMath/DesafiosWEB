// Conjunto dos campos e quantidade deles
let campos = document.querySelector("#campos")
let camposFilhos = campos.children
let input = document.querySelector("#qtdBotoes")
let escolhaBotoes = document.querySelector("#escolhaBotoes")
const matrizCampos = [], posBombas = []

// Atalho pra imprimir no console
function print(texto) {
	console.log(`${texto}`)
}

// Event listener no input
input.addEventListener("keydown", (event) => {
	if (event.key == "Enter") {
		criarBotoes()
	}
})

// Cria os botões e adiciona suas funções com os respectivos argumentos de posição
function criarBotoes() {
	// Prevenção de erro
	if (Number(input.value) <= 0) {
		window.alert("Valor deve ser positivo!")
		input.value = 1

		return
	}

	// Modificar tamanho da matriz para ficar igual à qtd de botões
	for (let i = 0; i < input.value; i++) {
		matrizCampos.push(0)
	}

	// Gerar posições aleatórias das N bombas na matriz
	// Tem 1/3 da quantidade de campos em bombas arredondado pra cima
	sortearBombas(Math.ceil(input.value / 3))

	// Esconde a área de escolha de botões
	escolhaBotoes.style.display = "none"

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

// Função de clicar em um campo
function clicarCampo(posCampo) {
	let campo = camposFilhos[posCampo]

	// Campo vazio
	if (matrizCampos[posCampo] == 0) {
		campo.classList.add("clicado")
		campo.innerHTML = ""
	} else { // Campo com bomba
		campo.classList.add("bomba")
		campo.innerHTML = "💣"

		// Mostra todas as bombas
		let cont = 1
		for (let pos of posBombas) {
			if (pos == posCampo) { continue	}

			setTimeout(() => {
				camposFilhos[pos].classList.add("bomba")
				camposFilhos[pos].innerHTML = "💣"
			}, 500 * cont)
			
			cont++
		}

		// Mostra mensagem de fim de jogo
		setTimeout(() => {
			window.alert("Fim de jogo! Você perdeu!")

			// Mostra a área de escolha de botões
			escolhaBotoes.style.display = "block"
			// Limpa os campos
			campos.innerHTML = ""
			// Limpa a matriz e o vetor
			matrizCampos.length = 0
			posBombas.length = 0
		}, cont * 500)
	}
}

// Função de escolher posições para as N bombas
function sortearBombas(numBombas) {
	let tamMatriz = matrizCampos.length

	// As posições serão obrigatoriamente únicas
	while (posBombas.length < numBombas) {
		// Posição aleatória entre 0 e tamanho da matriz
		let pos = Math.floor(Math.random() * tamMatriz)

		if (!posBombas.includes(pos)) {
			posBombas.push(pos)
		}
	}

	// Ordena de forma crescente
	posBombas.sort((a, b) => a - b)

	// Atribui 1 às posições que contêm bombas
	for (let pos of posBombas) {
		matrizCampos[pos] = 1 // 1 == tem bomba
	}
}
