const express = require("express");
const controllers = require("../controllers/userControllers") // Importa os controladores para cada rota
const verificarAutenticacao = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/registrar", controllers.registrar);
router.post("/login", controllers.login);

router.get("/verificar-nome/:nome", controllers.verificar_nome);

// Forma correta de utilizar função declarada no authmiddleware.js 
router.get("/perfil", verificarAutenticacao, controllers.autenticar);
router.get("/logout", verificarAutenticacao, controllers.logout);

module.exports = router; // Exporta todas as rotas para serem usas em server.js