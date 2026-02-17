// Função responsável por receber os dados de usuários e autenticar
async function logar(event) {
    event.preventDefault();
    const user = document.getElementById("Usuário")
    const nome = user.value

    const senha = document.getElementById("Senha")
    const code = senha.value

    try {
        const resposta = await fetch("http://localhost:3000/login", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify( {
                "nome": nome,
                "senha": code
            })
            });
            
            const dados = await resposta.json();
            console.log(dados);

            const msg = document.getElementById("msg-user");
            const msg_senha = document.getElementById("msg-senha");

            if(dados.erro === "Usuário não encontrado") {
                msg.textContent = "Nome de Usuário não existe";
                msg.style.color = "black";
                return;
            }

            if(dados.erro === "Senha incorreta") {
                msg_senha.textContent = "Senha inválida!";
                msg_senha.style.color = "red";
                return;
            }

            window.location.href = "./pages/home.html"

        } catch(erro) {
            console.error(erro);
            alert("Erro de conexão com o servidor");
        }
    }

const btn_login = document.getElementById("logar")
btn_login.addEventListener("click", logar)