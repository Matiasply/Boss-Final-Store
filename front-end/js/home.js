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

// Lógica para os botões
function perfil() {
    window.location.href = "perfil.html";
}
const botao_perfil = document.getElementById("btn-perfil")
botao_perfil.addEventListener("click", perfil)