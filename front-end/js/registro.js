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
// Pegar o botão de registro para interação
const btn_registro = document.getElementById("registrar");
btn_registro.disabled = true; // Botão de regsitro desabilitado enquanto não houver apelido válido

/*Assim que o usuário começar a digitar a função será chamada
 ela válida em tempo real o nome de usuário digitado*/
inputNome.addEventListener("input", async function() {

    const nome = inputNome.value;

    if (nome.length < 3) {
        msg.textContent = "Capricha no apelido!";
        msg.style.color = "black";
        btn_registro.disabled = true;
        return;
    }

    // Faz requisição em tempo real para verificar o nome
    const res = await fetch(`http://localhost:3000/verificar-nome/${nome}`);
    const data = await res.json();

    if (data.existe) {
        msg.textContent = "❌ Nome já está em uso";
        msg.style.color = "red";
        btn_registro.disabled = true; // O botão fica desabilitado se o nome já existir
    } else {
        msg.textContent = "Arrasou no apelido!";
        msg.style.color = "black";
        btn_registro.disabled = false; // O botão habilita com apelido válido
    }
});

// Função responsável por enviar os dados do usuário para o back
async function registrar(event) {
    event.preventDefault();
    const user = document.getElementById("usuario")
    const nome = user.value

    const senha = document.getElementById("senha")
    const code = senha.value
    const msg_senha = document.getElementById("msg-senha");

    // Validação de senha
    if (!code || code.trim() === "") {
        msg_senha.textContent = "A senha é obrigatória!";
        msg_senha.style.color = "red";
        return;
    }

    if (code.length < 4) {
        msg_senha.textContent = "Senha deve ter no mínimo 4 caracteres";
        msg_senha.style.color = "red";
        return;
    }

    // Limpa mensagem de erro
    msg_senha.textContent = "";

    // REVALIDAR se o nome ainda está disponível (previne race conditions)
    const verificacao = await fetch(`http://localhost:3000/verificar-nome/${nome}`);
    const dadosVerificacao = await verificacao.json();

    if (dadosVerificacao.existe) {
        msg.textContent = "❌ Este nome foi registrado recentemente. Escolha outro!";
        msg.style.color = "red";
        btn_registro.disabled = true;
        return;
    }

    const isonepiece = document.getElementById("onepiece")
    const faonepiece = isonepiece.checked

    const isflamengo = document.getElementById("flamengo")
    const torcefla = isflamengo.checked

    const issousa = document.getElementById("sousa")
    const sousa = issousa.checked

    try {
        const resposta = await fetch("http://localhost:3000/registrar", {
            credentials: "include",
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
            
            if (!resposta.ok) {
            alert(dados.erro || "Erro ao registrar");
            return;
            }

            /*Se o cadastro der certo, o usuário
            é redirecionado para a página de login*/
            window.location.href = "../index.html";

        } catch(erro) {
            console.error(erro);
            alert("Erro de conexão com o servidor");
        }
    }

const registro = document.getElementById("registrar")
registro.addEventListener("click", registrar)