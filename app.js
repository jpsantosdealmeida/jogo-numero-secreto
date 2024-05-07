/*
let titulo = document.querySelector('h1'); //criei uma variável titulo e usei o document.querySelector('h1') para selecionar a linha 22 do index.html
titulo.innerHTML = 'Jogo da adivinhação'; // innerHTML ele pegou a variavel titulo entrou na linha 22 e colocou esse titulo

let paragrafo = document.querySelector('p'); //criei uma variável parafrago e selecionei a tag p para modificar
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
*/

// Foi criada uma funçõ verificarChute no botão na linha 27, agora vou chamar ela.

let listaDeNumerosSorteados = []; // Lista vazia
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio()
let tentativa = 1


function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);  // Criei uma função com parametro de tag e texto
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo da Adivinhação');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');  // Chamei a função de tag e texto
}
  
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value; // pegando o valor no campo do botão
    
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativa} ${palavraTentativa}!`
        exibirTextoNaTela('p',mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled'); // Lá no index.html no botao, tem o id dele que se chama reiniciar, estou removendo a disabilitação após eu acertar o número secreto
        
        
    }else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor');
        }else{
            exibirTextoNaTela('p','O número secreto é maior');
        }
        tentativa++;
        limparCampo();
    }
    
}   

function gerarNumeroAleatorio(){
    let NumeroEscolhido = parseInt(Math.random() * numeroLimite + 1);  // Criei uma função para gerar número aleatório e usei o return para retornar esse número aleatório
    let quantidadeDeElementosNaLista= listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }


    if (listaDeNumerosSorteados.includes(NumeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(NumeroEscolhido)
        console.log(listaDeNumerosSorteados)
        return NumeroEscolhido;
    }
}


function limparCampo(){
     chute = document.querySelector('input');
     chute.value ='';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true) // Estou desativando o botão reiniciar com o setatribute após o reinicio do jogo e buscando o botão pelo id 
    
}