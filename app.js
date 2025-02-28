/**
 * Jogo1
 * @author Luiz Fernando
 */

// Registrando o Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(() => {
            console.log("Service worker registrado!");
        })
        .catch((error) => {
            console.error("Erro ao registrar o Service Worker:", error);
        });
}

//Elementos
const pedraRadio = document.getElementById('pedra');
const papelRadio = document.getElementById('papel');
const tesouraRadio = document.getElementById('tesoura');
const imgPedra = document.getElementById('img-pedra');
const imgPapel = document.getElementById('img-papel');
const imgTesoura = document.getElementById('img-tesoura');
const jogarBtn = document.getElementById('jogar-btn');
const resetBtn = document.getElementById('reset-btn');
const pcImg = document.getElementById('pc');
const pcEscolhaImg = document.getElementById('pc-escolha');
const resultadoText = document.getElementById('resultado');
const mensagemDiv = document.getElementById('mensagem');
const opcoesImgs = document.querySelectorAll('.opcoes');

// Função para atualizar o radio button quando a imagem é clicada
const atualizarRadio = (opcao) => {
    switch (opcao) {
        case 'pedra':
            pedraRadio.checked = true;
            break;
        case 'papel':
            papelRadio.checked = true;
            break;
        case 'tesoura':
            tesouraRadio.checked = true;
            break;
    }
};

// Eventos de clique nas imagens
opcoesImgs.forEach(img => {
    img.addEventListener('click', (event) => {
        const opcao = event.target.dataset.opcao;
        atualizarRadio(opcao);
        removerDestaque();
        event.target.classList.add('destaque');
    });
});

// Função para remover o destaque das imagens
const removerDestaque = () => {
    opcoesImgs.forEach(img => {
        img.classList.remove('destaque');
    });
};

//Eventos de click nos radio
pedraRadio.addEventListener('click', () => {
    removerDestaque();
    imgPedra.classList.add('destaque');
})

papelRadio.addEventListener('click', () => {
    removerDestaque();
    imgPapel.classList.add('destaque');
})

tesouraRadio.addEventListener('click', () => {
    removerDestaque();
    imgTesoura.classList.add('destaque');
})


function jogar() {
    mensagemDiv.innerText = "";
    let escolhaJogador;
    if (pedraRadio.checked) {
        escolhaJogador = 'pedra';
    } else if (papelRadio.checked) {
        escolhaJogador = 'papel';
    } else if (tesouraRadio.checked) {
        escolhaJogador = 'tesoura';
    } else {
        mensagemDiv.innerText = "Selecione uma opção!";
        return;
    }

    // Lógica principal
    // Sorteio da opção do computador
    const sorteio = Math.floor(Math.random() * 3);
    let escolhaComputador;
    switch (sorteio) {
        case 0:
            pcEscolhaImg.src = "img/pcpedra.png";
            escolhaComputador = 'pedra';
            break;
        case 1:
            pcEscolhaImg.src = "img/pcpapel.png";
            escolhaComputador = 'papel';
            break;
        case 2:
            pcEscolhaImg.src = "img/pctesoura.png";
            escolhaComputador = 'tesoura';
            break;
    }
    //mostra a escolha do pc
    pcEscolhaImg.style.display = 'block';


    // Determinar o resultado
    if (escolhaJogador === escolhaComputador) {
        resultadoText.innerText = "EMPATE";
    } else if ((escolhaJogador === 'pedra' && escolhaComputador === 'tesoura') ||
        (escolhaJogador === 'papel' && escolhaComputador === 'pedra') ||
        (escolhaJogador === 'tesoura' && escolhaComputador === 'papel')) {
        resultadoText.innerText = "VOCÊ GANHOU!";
    } else {
        resultadoText.innerText = "PC VENCEU!";
    }
}

function limpa() {
    mensagemDiv.innerText = "";
    //esconde a escolha do pc
    pcEscolhaImg.style.display = 'none';
    pcEscolhaImg.src = "";
    resultadoText.innerText = "";
    removerDestaque();
}

// Event listeners
jogarBtn.addEventListener('click', jogar);
resetBtn.addEventListener('click', limpa);
