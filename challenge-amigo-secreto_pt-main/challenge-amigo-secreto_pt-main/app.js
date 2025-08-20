let listaDeAmigos = [];
let listaDeAmigosSorteados = [];

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function adicionarAmigo() {
    let nomeAmigo = document.getElementById('amigo').value.trim();
    
    if (nomeAmigo === '') {
        exibirTextoNaTela('#resultado', 'Por favor, digite um nome válido!');
        return;
    }
    
    if (listaDeAmigos.includes(nomeAmigo)) {
        exibirTextoNaTela('#resultado', 'Este nome já foi adicionado!');
        return;
    }
    
    listaDeAmigos.push(nomeAmigo);
    atualizarListaAmigos();
    limparCampo();
    exibirTextoNaTela('#resultado', '');
}

function atualizarListaAmigos() {
    let listaHTML = document.getElementById('listaAmigos');
    listaHTML.innerHTML = '';
    
    listaDeAmigos.forEach(function(amigo) {
        let itemLista = document.createElement('li');
        itemLista.textContent = amigo;
        listaHTML.appendChild(itemLista);
    });
}

function sortearAmigo() {
    if (listaDeAmigos.length < 2) {
        exibirTextoNaTela('#resultado', 'Adicione pelo menos 2 amigos para sortear!');
        return;
    }
    
    // Se todos já foram sorteados, reinicia a lista
    if (listaDeAmigosSorteados.length === listaDeAmigos.length) {
        listaDeAmigosSorteados = [];
    }
    
    // Filtra amigos que ainda não foram sorteados
    let amigosDisponiveis = listaDeAmigos.filter(
        amigo => !listaDeAmigosSorteados.includes(amigo)
    );
    
    // Sorteia um amigo aleatório
    let indiceSorteado = Math.floor(Math.random() * amigosDisponiveis.length);
    let amigoSorteado = amigosDisponiveis[indiceSorteado];
    
    // Adiciona à lista de sorteados
    listaDeAmigosSorteados.push(amigoSorteado);
    
    // Exibe o resultado
    exibirTextoNaTela(`#resultado`, `Amigo secreto ${amigoSorteado}`);
}

function limparCampo() {
    document.getElementById('amigo').value = '';
}

// Função para reiniciar o sorteio (opcional)
function reiniciarSorteio() {
    listaDeAmigosSorteados = [];
    exibirTextoNaTela('#resultado', 'Sorteio reiniciado! Adicione novos amigos ou sorteie novamente.');
}