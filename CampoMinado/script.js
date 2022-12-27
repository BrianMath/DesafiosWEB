// Seção para escolher quantidade de botões
let escolhaBotoes = document.querySelector("section#escolhaBotoes")
let input = document.querySelector("input#qtdBotoes")
// Seção com os botões gerados dinamicamente
let campos = document.querySelector("section#campos")
let camposFilhos = campos.children
// Seção com a mensagem para o jogador
let mensagem = document.querySelector("section#mensagem p")
// matrizCampos será equivalente à quantidade de campos: -1 == (vazio clicado), 0 == (vazio), 1 == (bomba)
// posBombas terá as posições aleatórias das bombas criadas
const matrizCampos = [], posBombas = []

// Atalho pra imprimir no console
function print(texto) {
	console.log(`${texto}`)
}

// Event listener de apertar Enter no <input>
input.addEventListener("keydown", (event) => {
	if (event.key == "Enter") {
		// Os botões podem ser criados apertando Enter ou clicando no <button>
		criarBotoes()
	}
})

// Cria os botões e adiciona suas funções com os respectivos argumentos de posição
function criarBotoes() {
	// Prevenção de erro no <input>
	if (Number(input.value) <= 0) {
		window.alert("Valor deve ser pelo menos 1!")
		input.value = 1

		return
	}

	// Modificar tamanho da matriz para ficar igual à quantidade de botões desejados
	for (let i = 0; i < input.value; i++) {
		// Inicialmente todas as posições recebem 0 == vazio
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
			clicarCampo(campo.id)
		})
		
		// Adiciona o botão criado ao HTML
		campos.appendChild(campo)
	}
}

// Função de escolher posições para as N bombas
function sortearBombas(numBombas) {
	let tamMatriz = matrizCampos.length

	// As posições serão obrigatoriamente únicas
	while (posBombas.length < numBombas) {
		// Posição aleatória entre [0, tamanho da matriz[
		let pos = Math.floor(Math.random() * tamMatriz)

		if (!posBombas.includes(pos)) {
			posBombas.push(pos)
		}
	}

	/*
	(Opcional) Ordena de forma crescente para mostrar as bombas em ordem no final
	posBombas.sort((a, b) => a - b)
	*/

	// Atribui 1 às posições que contêm bombas
	for (let pos of posBombas) {
		matrizCampos[pos] = 1 // 1 == tem bomba
	}
}

// Função de clicar em um campo
function clicarCampo(posCampo) {
	// Seleciona o campo específico dentre a lista de filhos
	let campo = camposFilhos[posCampo]

	// Se o campo está VAZIO, ou seja, a posição correspondente na matriz == 0
	if (matrizCampos[posCampo] == 0) {
		campo.classList.add("clicado")
		campo.innerHTML = ""
		// Ao clicar num campo vazio a posição na matriz recebe -1 == vazio clicado
		matrizCampos[posCampo] = -1
	}
	// Se o campo TEM BOMBA, ou seja, a posição correspondente na matriz == 1
	else {
		campo.classList.add("bomba")
		campo.innerHTML = "💣"

		// Impede o jogador de clicar após achar uma bomba
		campos.classList.add("gameOver")
		mensagem.innerHTML = "😥 Fim de jogo! Você perdeu! 😥"

		/* Mostrar todas as bombas ao perder */

		// Contador de bombas
		let cont = mostrarBombas(posCampo)

		// Mostra mensagem de fim de jogo após todas as bombas já terem sido reveladas
		setTimeout(() => {
			novoJogo()
		}, cont * 1200)
	}

	// Confere se ganhou o jogo, ou seja, se não tem mais vazios sem clicar
	if (!matrizCampos.includes(0)) {
		// Impede de clicar após ganhar
		campos.classList.add("gameOver")
		mensagem.innerHTML = "🤩 Parabéns, você ganhou! 🤩"

		let cont = mostrarBombas()
		
		setTimeout(() => {
			novoJogo()
		}, cont * 1200)
	}
}

function mostrarBombas(posCampo = -1) {
	// Contador de bombas
	let cont = 1

	// posBombas é o vetor que contém as posições aleatórias com as bombas
	for (let pos of posBombas) {
		// Ignore a posição com bomba já clicada pelo usuário
		if (pos == posCampo) { continue	}

		// Mostra cada bomba com um intervalo de 500ms entre elas
		setTimeout(() => {
			camposFilhos[pos].classList.add("bomba")
			camposFilhos[pos].innerHTML = "💣"
		}, 500 * cont)
		
		cont++
	}

	return cont
}

function novoJogo() {
	// Mostra a área de escolha de botões
	escolhaBotoes.style.display = "block"
	// Limpa os campos criados anteriormente
	campos.innerHTML = ""
	// Limpa a matriz e o vetor
	matrizCampos.length = 0
	posBombas.length = 0
	// Remove a mensagem
	mensagem.innerHTML = ""
	// Habilita o click novamente
	campos.classList.remove("gameOver")

	input.focus()
	input.value = ''
}