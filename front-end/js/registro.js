function voltar() {

    if(history.length > 1) {
        history.back();
    } else {
        window.location.href = "../index.html";
    }
}

const botao = document.getElementById("seta")
botao.addEventListener("click", voltar)

function registrar() {
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

}

const registro = document.getElementById("registrar")
registro.addEventListener("click", registrar)