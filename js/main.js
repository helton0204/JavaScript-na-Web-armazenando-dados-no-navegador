
const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
itens = JSON.parse(localStorage.getItem("itens")) || []; //JSON.parse() transfora uma string em formato de objeto em um objeto

itens.forEach( (elemento) => {
    criaElemento(elemento);
} )

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome']; //"nome" e "quantidade" se referem ao id html desses elementos
    const quantidade = evento.target.elements['quantidade'];

    const itemAtual = {
        nome: nome.value,
        quantidade: quantidade.value,
        id: null 
    }

    const existe = itens.find( elemento => elemento.nome === nome.value ); //O código acima verifica se existe algum elemento com o mesmo nome. Caso exista, ele guarda o objeto na const existe, ou undefined caso não exista.

    if (existe) {
        itemAtual.id = existe.id;
        
        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]) : 0; //modifica o id null para itens.length
        if(itemAtual.nome != "" && itemAtual.quantidade != ""){
            criaElemento(itemAtual); 
            itens.push(itemAtual);
        }
    }

    localStorage.setItem("itens", JSON.stringify(itens)); //localStorage é um recurso utilizado para salvar dados do tipo texto string no navegador da pessoa usuária.
                                                         //JSON.stringify() transforma objetos, arrays, e listas em string. É composto por (chave, valor)
    form.reset();
})

function criaElemento(item) {
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem);
    
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));
    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";
    
    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
}

function deletaElemento(elemento, id){
    elemento.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1); //o método splice remove um elemento do array
    localStorage.setItem("itens", JSON.stringify(itens));
}