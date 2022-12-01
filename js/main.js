/* Operador lógico que retorna com dados salvos, ou string vazia, 
utilizando localStorage.getItem, modificando o valor de `string` 
com JSON.parse() */
const form = document.getElementById("novoItem")
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || []

/* Uso do forEach para que todos os itens já escritos
 na lista sejam mantidos ao atualizar a página */
itens.forEach((elemento) => {
    criaElemento(elemento)
})


/* Refatoração do addEventListener para receber as funções 
extras da função criaElemento */
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        //garate que o elemento correto seja achado e substituido  
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        // se nao tiver nada no id é 0, se ja existir o ultimo elemento soma +1 (operador ternario)  
        itemAtual.id = itens(itens.length - 1) ? (itens(itens.length - 1)).id + 1 : 0;

        //cria o objeto
        criaElemento(itemAtual)
        // inseri o objeto no array
        itens.push(itemAtual)
    }



    //stringify - converte valores em javascript para uma String JSON.
    localStorage.setItem("itens", JSON.stringify(itens))

    // limpa o campo de preenchimento 
    nome.value = ""
    quantidade.value = ""
})

/* Refatoração da função `criaElemento` para que possua apenas 
a função que faça sentido ao nome. */
function criaElemento(item) {
    //<li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)


}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade
}

function botaoDeleta(id) {

    //criou o botao com X para remover o item da mochila
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}
//funcao para remover o item da mochila "tag é apenas parar receber o parametro como elemento"
function deletaElemento(tag, id) {
    tag.remove()

    //remover um item do array
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    //remover um item do localStorage
    localStorage.setItem("itens", JSON.stringify(itens))
}