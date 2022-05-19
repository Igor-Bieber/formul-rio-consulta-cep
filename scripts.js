const form = document.getElementById("form");
const cep = document.getElementById("cep");
const rua = document.getElementById("rua");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");
const ibge = document.getElementById("ibge");
const ddd = document.getElementById("ddd");


/*const que executa uma função assíncrona, aonde consulta-se o valor digitado no input de CEP e trata
as informações retornadas em json, executando caso não houver erro, a função preencheForm que preenche cada campo
do formulário com os dados devoldidos em .json */
const pesquisaCep = async() =>{
    const cepValue = cep.value;
    const url = `https://viacep.com.br/ws/${cepValue}/json/`;
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty('erro')){
        setErrorFor(cep,"Cep Inválido ou não existente no banco de dados!")
        clearInputs();
    } else if(cepValue.length > 8) {
        setErrorFor(cep,"Cep inválido! Digite um cep de 8 números.")
        clearInputs();
    }else if(cepValue.length < 1){
        setErrorFor(cep,"Cep inválido! Digite um cep de 8 números.")
        clearInputs();
    }else{
        preencheForm (endereco);
        desabilitaInput ();
    }
}

/*const que recebe os dados em json da consulta do cep e executa uma função que muda os valores
de cada input de acordo com o modelo que é fornecido pelo json*/ 
const preencheForm = (endereco) =>{
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
    document.getElementById('ibge').value = endereco.ibge;
    document.getElementById('ddd').value = endereco.ddd;
}

cep.addEventListener("focusout",pesquisaCep)

//------------------FUNÇÕES-----------------------

function desabilitaInput(){
    const input1 = document.querySelector('#rua');
    input1.disabled = true;
    const input2 = document.querySelector('#bairro');
    input2.disabled = true;
    const input3 = document.querySelector('#cidade');
    input3.disabled = true;
    const input4 = document.querySelector('#uf');
    input4.disabled = true;
    const input5 = document.querySelector('#ibge');
    input5.disabled = true;
    const input6 = document.querySelector('#ddd');
    input6.disabled = true;

}

//função que deixa todos os campos vazios
function clearInputs(){
    document.getElementById('cep').value = "";
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
    document.getElementById('ibge').value = "";
    document.getElementById('ddd').value = "";
}

//função de erro
function setErrorFor (input, message) {
    /*input.parentElemente = puxa o elemento PAI do INPUT*/ 
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    //exibe a mensagem de erro
    small.innerText = message;
    /*muda o nome da classe adicionando o erro la no html*/
    formControl.className = "form-control error";
}

//função de sucesso
function setSuccessFor (input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

