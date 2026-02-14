const express = require("express");
const app = express(); //Cria o server
const fs = require("fs"); //Biblioteca para manipular arquivos do sistema
const cors = require("cors");


app.use(express.json());//Permite ler json
app.use(cors());//Evitar erro de portas front(5500) back(3000)

//Rota para teste
app.get("/", function(req, res) {
    res.send("Deu certo");
})

//Rota post de registro de usuário(CREATE)
app.post ("/registrar", function(req, res) {
    const {nome, senha, isonepiece, isflamengo, issousa} = req.body;

    
    // ler arquivo JSON atual
    const dadosAtuais = fs.readFileSync("usuarios.json", "utf-8");
    const usuarios = JSON.parse(dadosAtuais);
    
    // criar novo usuário
    const novoUsuario = { nome, senha, isonepiece, isflamengo, issousa };
    
    // adicionar na lista
    usuarios.push(novoUsuario);
    
    // salvar de volta no arquivo
    fs.writeFileSync("usuarios.json", JSON.stringify(usuarios, null, 2));
    res.json({mensagem: "Usuário cadastrado"});

})

/* Abre o servidor na porta 3000
deve ser sempre o último bloco de código*/
app.listen(3000, function() {
    console.log("Server on em:");
})