const express = require("express");
const session = require("express-session")
const path = require("path")
const userRoutes = require("./routes/userRoutes") // Importa as rotas usadas pela API

const app = express(); //Cria o server

app.use(express.json());//Permite ler json

//Abre sessões para o servidor saber quem é o usuário 
app.use(session({
    secret: "One-piece", //Nome genérico para dizer que é um segredo
    resave: false, //Não salva sessão se nada mudou
    saveUninitialized: false, //Não cria sessão vazia
    cookie: {
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 15 //15 minutos de sessão
    }
}))

app.use(express.static(path.join(__dirname, "../front-end"))) //Remove a necessidade de CORS

app.use("/api", userRoutes);

/* Abre o servidor na porta 3000
deve ser sempre o último bloco de código*/
app.listen(3000, function() {
    console.log("Server funcionando!");
})