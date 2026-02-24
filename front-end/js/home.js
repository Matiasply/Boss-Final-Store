// JavaScript para o slider de imagens
let count =1;
document.getElementById("radio1").checked = true;

setInterval( function(){;
    nextImage();
}, 5000);

function nextImage(){
    count++;
    if(count > 4){
        count = 1;
    }
    document.getElementById("radio" + count).checked = true;
}

const botao_visitante = document.getElementById("btn-visitante");

// Mostrar o botao de visitante apenas quando nao houver sessao
document.addEventListener("DOMContentLoaded", async function () {
    if (!botao_visitante) {
        return;
    }

    try {
        const resposta = await fetch("http://localhost:3000/perfil", {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const dados = await resposta.json();
        botao_visitante.hidden = dados.erro !== "Sem login";
    } catch (erro) {
        console.error(erro);
    }
});

// Função para fazer logout
async function logout() {
    try {
        await fetch("http://localhost:3000/logout", {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        // Redireciona para login
        window.location.href = "../index.html";
    } catch(erro) {
        console.error(erro);
        alert("Erro ao fazer logout");
    }
}

// Lógica para abrir a página de perfil
async function perfil() {

    try {
        const resposta = await fetch("http://localhost:3000/perfil", {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        );

        const dados = await resposta.json();
        console.log(dados);

        if(dados.erro === "Sem login") {
            window.location.href = "../index.html";
            return;
        } else{
            window.location.href = "perfil.html";
        }
        
    } catch(erro) {
        console.error(erro);
    }
}
const botao_perfil = document.getElementById("btn-perfil")
botao_perfil.addEventListener("click", perfil)
