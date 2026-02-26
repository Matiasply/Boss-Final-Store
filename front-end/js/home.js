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

// Mostrar o botao de sair apenas quando houver sessão visitante
document.addEventListener("DOMContentLoaded", async function () {
    const logoutContainer = document.getElementById("logout-container");
    
    if (!logoutContainer) {
        console.log("Container de logout não encontrado");
        return;
    }

    // Garante que começa escondido
    logoutContainer.style.display = 'none';
    console.log("Container inicialmente escondido");

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
        console.log("Tem erro?", dados.erro);  // Debug
        
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
            logoutContainer.style.display = 'block';  // Mostra container
        } else {
            console.log("Usuário logado, mantendo botão escondido");  // Debug
            logoutContainer.style.display = 'none';   // Garante que está escondido
        }
    } catch (erro) {
        console.error("Erro ao verificar sessão:", erro);
        logoutContainer.style.display = 'none';  // Esconde em caso de erro
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