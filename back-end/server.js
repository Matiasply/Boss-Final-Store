const express = require("express");
const session = require("express-session");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const pool = require("./config/db"); // conexão com PostgreSQL

const app = express(); //Cria o server

// Testa conexão com o banco
pool.connect()
.then(() => {
    console.log("Conectado ao PostgreSQL!");
})
.catch((err) => {
    console.error("Erro ao conectar no PostgreSQL:", err);
});

app.use(express.json()); //Permite ler json

//Abre sessões para o servidor saber quem é o usuário 
app.use(session({
    secret: "One-piece",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 15
    }
}));

app.use(express.static(path.join(__dirname, "../front-end")));

app.use("/api", userRoutes);

/* Abre o servidor na porta 3000 */
app.listen(3000, function() {
    console.log("Server funcionando!");
});