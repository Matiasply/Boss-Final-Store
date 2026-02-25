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

// Mostrar o botao de sair apenas quando houver sessao ou visitante
document.addEventListener("DOMContentLoaded", async function () {
    const btnVisitante = document.getElementById("btn-visitante");
    const btnLogado = document.getElementById("btn-logado");
    
    if (!btnVisitante || !btnLogado) {
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
        console.log("Dados perfil:", dados);  // Debug
        
        // Se nao tiver login (Sem login), faz logout explícito para limpar sessão residual
        if (dados.erro === "Sem login") {
            console.log("Detectado visitante, mostrando botão de visitante");  // Debug
            
            // Faz logout e espera completar
            const logoutResp = await fetch("http://localhost:3000/logout", {
                credentials: "include",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            console.log("Logout realizado, mostrando botão de visitante");  // Debug
            btnVisitante.hidden = false;  // Mostra botão de visitante
            btnLogado.hidden = true;      // Esconde botão de logado
        } else {
            console.log("Usuário logado, mostrando botão de sair");  // Debug
            btnVisitante.hidden = true;   // Esconde botão de visitante
            btnLogado.hidden = false;     // Mostra botão de sair logado
        }
    } catch (erro) {
        console.error("Erro ao verificar sessão:", erro);
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
