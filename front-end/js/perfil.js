function voltar() {
    
    if(history.length > 1) {
        history.back();
    } else {
        window.location.href = "../index.html";
    }
}

const botao = document.getElementById("seta")
botao.addEventListener("click", voltar)

document.addEventListener("DOMContentLoaded", async function () {
    
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
        
        const nome = dados.nome;
        const pirata = dados.onepiece;
        const flamenguista = dados.flamenguista;
        const sousense = dados.sousense;

        const user = document.getElementById("Nome do usuário");
        user.textContent = nome;

} catch(erro) {
    console.error(erro);
}
}
)


