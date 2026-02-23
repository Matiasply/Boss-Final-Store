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
        
        console.log(dados)
        const nome = dados.nome
        const pirata = dados.onepiece
        const flamenguista = dados.flamenguista
        const sousense = dados.sousense

        const user = document.getElementById("Nome do usuário");
        user.textContent = nome;

        //  Fã de One Piece
        const dado1 = document.getElementById("One Piece");
        if(pirata) {
            dado1.textContent = "Membro dos Chapéus de Palha"
        } else {
            dado1.textContent = "Cria do Akainu"
        }

        // Flamenguista
        const dado2 = document.getElementById("flamenguista");
        if(flamenguista) {
            dado2.textContent = "Flamenguista"
        } else {
            dado2.textContent = "Não torce pro flamengo" // Pensar em algo melhor
        }

        // Sousense
        const dado3 = document.getElementById("sousense");
        if(sousense) {
            dado3.textContent = "Sousense";
        } else {
            dado3.textContent = "Deve torcer pro galo" // Ver se vai ficar legal mesmo
        }

} catch(erro) {
    console.error(erro);
    }
}
)