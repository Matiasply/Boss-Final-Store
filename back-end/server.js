const express = require("express");
const app = express(); //Cria o server
const fs = require("fs"); //Biblioteca para manipular arquivos do sistema
const cors = require("cors");

//Permite ler json
app.use(express.json());
app.use(cors());//Evitar erro de portas

//Rota para teste
app.get("/", function(req, res) {
    res.send("Deu certo");
})

//Rota de registro de usuário
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

// Abre o servidor na porta 3000
//Deve ser sempre o último bloco de código
app.listen(3000, function() {
    console.log("Server on em:");
})