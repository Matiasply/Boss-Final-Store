function voltar() {

    if(history.length > 1) {
        history.back();
    } else {
        window.location.href = "../index.html";
    }
}

const botao = document.getElementById("seta")
botao.addEventListener("click", voltar)

// Função para validar nome de usuário em tempo real
const inputNome = document.getElementById("usuario");
const msg = document.getElementById("msg-user");

//Assim que o usuário começar a digitar a função será chamada
inputNome.addEventListener("input", async function() {
    const nome = inputNome.value;

    if (nome.length < 3) {
        msg.textContent = "Digite pelo menos 3 caracteres";
        msg.style.color = "black";
        return;
    }

    // Faz requisição em tempo real para verificar o nome
    const res = await fetch(`http://localhost:3000/verificar-nome/${nome}`);
    const data = await res.json();

    if (data.existe) {
        msg.textContent = "❌ Nome já está em uso";
        msg.style.color = "red";
    }
});

// Função responsável por enviar os dados do usuário para o back
async function registrar() {
    const user = document.getElementById("usuario")
    const nome = user.value

    const senha = document.getElementById("senha")
    const code = senha.value

    const isonepiece = document.getElementById("onepiece")
    const faonepiece = isonepiece.checked

    const isflamengo = document.getElementById("flamengo")
    const torcefla = isflamengo.checked

    const issousa = document.getElementById("sousa")
    const sousa = issousa.checked

    try {
        const resposta = await fetch("http://localhost:3000/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(
                {
                    "nome": nome,
                    "senha": code,
                    "isonepiece": faonepiece,
                    "isflamengo": torcefla,
                    "issousa": sousa
                })
            });
            
            const dados = await resposta.json();
            console.log(dados.erro)
            
            
            /* Se o usuário for cadastrado, ele é
            redirecionado para a página principal*/
            if (dados.mensagem == "Usuário cadastrado") {
                window.location.href = "home.html";
            } 

        } catch(erro) {
            console.error(erro);
        }
    }

const registro = document.getElementById("registrar")
registro.addEventListener("click", registrar)