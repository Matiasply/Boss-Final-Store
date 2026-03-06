const pool = require("../config/db");

// Buscar usuário pelo nome
async function buscarPorNome(usuario) {
    const resultado = await pool.query(
        "SELECT * FROM usuarios WHERE usuario = $1",
        [usuario]
    );
    return resultado.rows[0];
}

// Criar novo usuário
async function criarUsuario(nome, senhaHash, is_onepiece, is_flamengo, is_sousa) {
    const resultado = await pool.query(
        `INSERT INTO usuarios (nome, senha, is_onepiece, is_flamengo, is_sousa)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [nome, senhaHash, is_onepiece, is_flamengo, is_sousa]
    );

    return resultado.rows[0];
}

module.exports = {
    buscarPorNome,
    criarUsuario
};