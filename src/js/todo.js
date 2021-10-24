
// recupera elemetros para capturar entrada do usuario
const inputItem = document.querySelector(".inputField input");
const inputEditItem = document.querySelector(".edit input");

const addBtn = document.querySelector(".inputField button");
const removeTodosItensBtn = document.querySelector(".footer button");

const todoList = document.querySelector(".todo-list");
edit = document.querySelector(".edit");
console.log(addBtn);

inputItem.onkeyup = () => {
    let userData = inputItem.value; // recupera valor da entrada
    if (userData.trim() != 0) { //entradas em branco não são inseridas na lista
        addBtn.classList.add("active"); // ativa o campo para salvar item
    } else {
        addBtn.classList.remove("active"); // desativa campo de salvar item
    }
}

addBtn.onclick = () => {
    listaItens = [];
    let userData = inputItem.value;
    let getLocalStorage = localStorage.getItem("New Todo"); // recupera localStorage
    if (getLocalStorage == null) {
        listaItens = []; //cria a lista de itens
    } else {
        listaItens = JSON.parse(getLocalStorage);
    }
    // verifica se o item já está presente na lista
    if (listaItens.includes(inputItem.value)) {
        alert("Item já existe na lista");
    } else {
        listaItens.push(userData);
        addBtn.classList.remove("active");
        localStorage.setItem("New Todo", JSON.stringify(listaItens));
        showTasks();
    }
}

function showTasks() {
    edit.classList.remove("active");
    let getLocalStorage = localStorage.getItem("New Todo"); // recupera localStorage
    if (getLocalStorage == null) {
        listaItens = []; //cria a lista de it'ens
    } else {
        listaItens = JSON.parse(getLocalStorage);
    }
    const quantidadeItens = document.querySelector(".quantidade-itens");
    quantidadeItens.textContent = listaItens.length;
    let novoItem = '';
    if (listaItens.length > 0) { //entradas em branco não são inseridas na lista
        removeTodosItensBtn.classList.add("active"); // ativa o campo para salvar item
    } else {
        removeTodosItensBtn.classList.remove("active"); // desativa campo de salvar item
    }

    listaItens.forEach((atributo, posicao) => {

        novoItem += `<li>${atributo}<span><i id="alteaItem" onclick="editaItem(${posicao})" class="fa fa-edit"></i> <i id="removeItem" onclick ="deletaItem(${posicao})" class="fa fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = novoItem;
    inputItem.value = '';
}

function deletaItem(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listaItens = JSON.parse(getLocalStorage);

    listaItens.splice(index, 1); // remove item do indice
    localStorage.setItem("New Todo", JSON.stringify(listaItens));
    showTasks();
}

removeTodosItensBtn.onclick = () => {
    if (confirm("Tem certeza que deseja limpar toda sua lista de itens?")) {
        listaItens = []
        localStorage.setItem("New Todo", JSON.stringify(listaItens));
        showTasks();
    }
}

function editaItem(index) {

    //entradas em branco não são inseridas na lista    
    edit.classList.add("active");

    inputEditItem.value = listaItens[index]; // recupera valor da entrada

    let salvar = document.querySelector(".edit #salvar");
    salvar.setAttribute("onclick", `salvarAlteracao(${index})`);
}

function cancelaAlteracao() {
    inputEditItem.value = '';
    edit.classList.remove("active");
}

function salvarAlteracao(index) {
    let alteracao = inputEditItem.value;
    if (alteracao.trim() != 0) {
        let getLocalStorage = localStorage.getItem("New Todo");
        listaItens = JSON.parse(getLocalStorage);
        listaItens[index] = inputEditItem.value;
        //listaItens[].lice(index, 1); // remove item do indice
        localStorage.setItem("New Todo", JSON.stringify(listaItens));
        showTasks();
    } else{
        alert("Não é permitido entrada de campos vazios");
    }
    edit.classList.remove("active");
}