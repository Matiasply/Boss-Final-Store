function verificarAutenticacao(req, res, next) {
  if (!req.session || !req.session.usuario) {
    return res.status(401).json({erro: "Sem login"});
  }

  next();
}

module.exports = verificarAutenticacao;