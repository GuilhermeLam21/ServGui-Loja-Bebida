const formulario = document.querySelector("#form-produto");
const nomeInput = document.querySelector("#nome");
const precoInput = document.querySelector("#preco");
const quantidadeInput = document.querySelector("#quantidade");
const listaProdutos = document.querySelector("#lista-produtos");
const contador = document.querySelector("#contador");
const listaVazia = document.querySelector("#lista-vazia");
const botaoFormulario = document.querySelector("#botao-formulario");
const mensagem = document.querySelector("#mensagem");

let produtoEditando = null;

function atualizarLista() {
    const total = listaProdutos.children.length;

    contador.textContent = `Produtos cadastrados: ${total}`;

    if (total === 0) {
        listaVazia.style.display = "block";
    } else {
        listaVazia.style.display = "none";
    }
}

function limparFormulario() {
    formulario.reset();
    produtoEditando = null;
    botaoFormulario.textContent = "Adicionar produto";
    mensagem.textContent = "";
    nomeInput.focus();
}

function criarProduto(nome, preco, quantidade) {
    const item = document.createElement("li");
    item.classList.add("item-produto");

    const informacoes = document.createElement("div");
    informacoes.classList.add("informacoes-produto");

    const nomeProduto = document.createElement("p");
    nomeProduto.classList.add("nome-produto");
    nomeProduto.textContent = nome;

    const detalhes = document.createElement("p");
    detalhes.classList.add("detalhes-produto");
    detalhes.textContent =
        `R$ ${preco.toFixed(2).replace(".", ",")} - ${quantidade} unidade(s)`;

    informacoes.appendChild(nomeProduto);
    informacoes.appendChild(detalhes);

    const acoes = document.createElement("div");
    acoes.classList.add("acoes");

    const botaoEditar = document.createElement("button");
    botaoEditar.type = "button";
    botaoEditar.textContent = "Editar";
    botaoEditar.classList.add("botao-editar");

    const botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.textContent = "Remover";
    botaoRemover.classList.add("botao-remover");

    botaoEditar.addEventListener("click", function () {
        nomeInput.value = nomeProduto.textContent;
        precoInput.value = preco;
        quantidadeInput.value = quantidade;

        produtoEditando = item;
        botaoFormulario.textContent = "Salvar alterações";
        mensagem.textContent = "";
        nomeInput.focus();
    });

    botaoRemover.addEventListener("click", function () {
        if (produtoEditando === item) {
            limparFormulario();
        }

        item.remove();
        atualizarLista();
    });

    acoes.appendChild(botaoEditar);
    acoes.appendChild(botaoRemover);

    item.appendChild(informacoes);
    item.appendChild(acoes);

    listaProdutos.appendChild(item);
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = nomeInput.value.trim();
    const preco = Number(precoInput.value);
    const quantidade = Number(quantidadeInput.value);

    if (nome === "") {
        mensagem.textContent = "Informe o nome da bebida.";
        return;
    }

    if (preco <= 0 || Number.isNaN(preco)) {
        mensagem.textContent = "O preço deve ser maior que zero.";
        return;
    }

    if (quantidade <= 0 || Number.isNaN(quantidade)) {
        mensagem.textContent = "A quantidade deve ser maior que zero.";
        return;
    }

    if (produtoEditando) {
        const nomeProduto = produtoEditando.querySelector(".nome-produto");
        const detalhes = produtoEditando.querySelector(".detalhes-produto");

        nomeProduto.textContent = nome;
        detalhes.textContent =
            `R$ ${preco.toFixed(2).replace(".", ",")} - ${quantidade} unidade(s)`;

        limparFormulario();
    } else {
        criarProduto(nome, preco, quantidade);
        limparFormulario();
        atualizarLista();
    }
});

// Produtos iniciais para demonstrar a loja.
criarProduto("Cerveja", 6.50, 24);
criarProduto("Refrigerante", 7.00, 15);
criarProduto("Vodka", 39.90, 8);
criarProduto("Energético", 9.50, 20);

atualizarLista();
