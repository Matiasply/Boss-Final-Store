const express = require("express");
const router = express.Router();
const controllers = require("../controllers/usercontrollers"); // Importa as funções de controllers para aplicar nas rotas
const middleware = require("../middlewares/authMiddleware");

router.post("/registrar", controllers.registrar);
router.post("/login", controllers.login);

router.get("/verificar-nome/:nome", controllers.verificar_nome);
router.get("/perfil", middleware.verificarAutenticacao, controllers.autenticar);
router.get("/logout", middleware.verificarAutenticacao, controllers.logout);

module.export = router; // Exporta todas as rotas para serem usas em server.js