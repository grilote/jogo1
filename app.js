/**
 * Jogo1
 * @author Luiz Fernando
 */

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
            console.log("Service worker registrado!")
        })
}

function jogar() {
    // Validação de escolha de opção do jogador
    // Usamos o argumento checked para avaliar radion buttons e checkedbox.
    if(document.getElementById('pedra').checked === false &&
    document.getElementById('tesoura').checked === false &&
    document.getElementById('papel').checked === false){
        alert("Selecione uma das opções disponíveis.")
    } else {
        event.preventDefault() 
        //Lógica principal
        // Sorteio da opção do computador
        let sorteio = Math.floor(Math.random() * 3)
        switch (sorteio) {
            case 0:
                document.getElementById('pc').src = "img/pcpedra.png"
            break
            case 1:
                document.getElementById('pc').src = "img/pcpapel.png"
            break
            case 2:
                document.getElementById('pc').src = "img/pctesoura.png"
            break
        }
        if ((document.getElementById('pedra').checked === true && sorteio === 0) ||
        (document.getElementById('papel').checked === true && sorteio === 1) ||
        (document.getElementById('tesoura').checked === true && sorteio === 2)){
            document.getElementById('resultado').innerText="EMPATE"
        } else if ((document.getElementById('pedra').checked === true && sorteio === 2) ||
        (document.getElementById('papel').checked === true && sorteio === 0) ||
        (document.getElementById('tesoura').checked === true && sorteio === 1)) {
            document.getElementById('resultado').innerText="VOCÊ GANHOU!"
        } else {
            document.getElementById('resultado').innerText="PC VENCEU!"
        }
    }
}

function limpa() {
    event.preventDefault() 
    document.getElementById('pc').src = "img/pc.png"
    document.getElementById('resultado').innerText = ""
}