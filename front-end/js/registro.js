function voltar() {

    if(history.length > 1) {
        history.back();
    } else {
        window.location.href = "../index.html";
    }

}

const botao = document.getElementById("seta")
botao.addEventListener("click", voltar)