const fs = require("fs"); //Biblioteca para manipular arquivos do sistema
const path = require("path")
const bcrypt = require("bcrypt") // Criptografia das senhas

// Função resposável pelo registro do usuário
async function registrar(req, res) {
    const {nome, senha, isonepiece, isflamengo, issousa} = req.body;

    // Validação de senha obrigatória
    if (!senha || senha.trim() === "") {
        return res.status(400).json({ erro: "Senha é obrigatória" });
    }

    if (senha.length < 4) {
        return res.status(400).json({ erro: "Senha deve ter no mínimo 4 caracteres" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const caminho = path.join(__dirname, "..", "usuarios.json")

    // ler arquivo JSON atual

    const dadosAtuais = fs.readFileSync(caminho, "utf-8");

    const usuarios = JSON.parse(dadosAtuais);
    
    // VERIFICAR SE USUÁRIO JÁ EXISTE (previne duplicatas)
    const usuarioExiste = usuarios.find(function(u) {
        return u.nome === nome;
    });

    if (usuarioExiste) {
        return res.status(409).json({ erro: "Usuário já existe" });
    }
    
    // criar novo usuário
    const novoUsuario = { nome, senhaHash, isonepiece, isflamengo, issousa };
    
    // adicionar na lista
    usuarios.push(novoUsuario);
    
    // salvar de volta no arquivo
    fs.writeFileSync(caminho, JSON.stringify(usuarios, null, 2));

    res.json({mensagem: "Usuário cadastrado"});

}

// Função para verificar o nome no input do registro
function verificar_nome(req, res) {
    const nome = req.params.nome // Recebe o nome enviado pelo caminho

    const caminho = path.join(__dirname, "..", "usuarios.json")
    //Lê os usuários
    const nomes_atuais = fs.readFileSync(caminho, "utf-8")
    //Transforma em objeto JS
    const nomes = JSON.parse(nomes_atuais)

    //Faz uma varredura comparando com todos os nomes
    for(let name of nomes) {
        if(nome === name.nome)
            return res.json({existe: true});
    }

    //Se o for não achar, então o nome ainda não existe
    return res.json({existe: false});
}

// Função para fazer login
async function login(req, res) {

    const {nome, senha} = req.body;

    const caminho = path.join(__dirname, "..", "usuarios.json");

    //Lê os usuários
    const usuarios_atuais = fs.readFileSync(caminho, "utf-8");

    const users = JSON.parse(usuarios_atuais);

    const usuario = users.find(function (u) {
        return u.nome === nome; //Retorna o usuário
    });

    // usuário não existe
    if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);

    // senha errada
    if (!senhaCorreta) {
        return res.status(401).json({ erro: "Senha incorreta" });
    }

    // sucesso
    req.session.usuario = nome; //Inicia a sessão com o nome do usuário
    req.session.isonepiece = usuario.isonepiece;
    req.session.isflamengo = usuario.isflamengo;
    req.session.issousa = usuario.issousa;

    //Força o salvamento antes de responder
    req.session.save(function () {
    res.json({ mensagem: "Login realizado com sucesso" });
    });

}

// Função de autenticação de usuário
function autenticar(req, res) {

    console.log(req.session);
    if (!req.session.usuario) {
        return res.json( {erro: "Sem login"});
    }

    /*Retorna um json com todas as informações
    do atual usuário da sessão */
    return res.json({
        nome: req.session.usuario,
        onepiece: req.session.isonepiece,
        flamenguista: req.session.isflamengo,
        sousense: req.session.issousa
    })
}

// Função de logout que destrói a sessão ativa
function logout(req, res) {
    req.session.destroy(function(erro) {
        if (erro) {
            return res.status(500).json({erro: "Erro ao fazer logout"});
        }
        res.json({mensagem: "Logout realizado"});
    });
}

// Exporta as funções para serem usadas em routes
module.exports = {
    registrar,
    verificar_nome,
    login,
    autenticar,
    logout,
};