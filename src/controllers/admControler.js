import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { buscarEmail, criarAdm, listaAdms, atualizarAdm, desativaAdm } from "../models/admin.js";

//login
export async function login(req, res) {
    try {
        const { email, senha } = req.body;
        
        if(!email || !senha) {
            return res.status(400).json({
                mensagem: "Informe e-mail e senha."
            });
        };

        const adm = await buscarEmail(email);

        if(!adm) {
            return res.status(401).json({
                mensagem: "E-mail ou senha incorretos."
            });
        }

        const senhaCorreta = await bcrypt.compare(
            senha,
            adm.senha_hash
        );

        if(!senhaCorreta) {
            return res.status(401).json({
                mensagem: "E-mail ou senha incorretos."
            });
        };

        const token = jwt.sign(
            {id: adm.id, email: adm.email},
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        return res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            token,
            admin: {
                id: adm.id,
                nome: adm.nome,
                email: adm.email
            }
        });

    } catch (error) {
        console.error(`Erro no login: ${error}`);

        return res.status(500).json({
            mensagem: "Erro no servidor."
        })
    }
}

//cadastro
export async function cadastrarAdm(req, res) {
    try {
        if(String(req.adm.id) !== "1") {
            return res.status(403).json({
                mensagem: "Você não tem perimissão pra criar administadores."
            });
        }

        const { nome, email, senha } = req.body;

        if(!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: "Preencha todos os campos."
            });
        }

        const emailExistente = await buscarEmail(email);

        if (emailExistente) {
            return res.status(409).json({
                mensagem: "Este e-mail já está sendo usado."
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const novoAdm = await criarAdm(
            nome,
            email,
            senhaHash
        );

        return res.status(201).json({
            mensagem: "Administrador criado com Sucesso!",
            admin: novoAdm
        })
    } catch (error) {
        console.error("Erro ao cadastrar administrador:", error);

        return res.status(500).json({
            mensagem: "Erro no servidor"
        });
    }
}

//listar
export async function listarAdms(req, res) {
     try {
        const administradores = await listaAdms();

        return res.status(200).json({
            mensagem: "Administradores encontrados!",
            administradores
        });

    } catch (error) {
        console.error("Erro ao listar administradores:", error);

        return res.status(500).json({
            mensagem: "Erro no servidor."
        });
    }
}

//atualiza
export async function atualizarAdmin(req, res) {
    try {
        if (String(req.adm.id) !== "1") {
            return res.status(403).json({
                mensagem: "Você não tem permissão para atualizar administradores."
            });
        }                   

        const { id } = req.params;
        const { nome, email, senha } = req.body;
        
        if(!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: "Preencha todos os campos."
            });
        }

        const admExiste = await buscarEmail(email);

        if(admExiste && String(admExiste.id) !== String(id)) {
            return res.status(409).json({
                mensagem: "Este e-mail já está sendo utilizado."
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const admAtualizado = await atualizarAdm(
            nome, email, senhaHash, id
        );

        if(!admAtualizado) {
            return res.status(404).json({
                mensagem: "Administrador não encontrado."
            });
        }

        return res.status(200).json({
            mensagem: "Administrador atualizado com sucesso!",
            adm: admAtualizado
        });
    } catch (error) {
        console.error("Erro ao atualizar administrador:", error);

        return res.status(500).json({
            mensagem: "Erro no servidor."
        })
    }
}

//desativa
export async function excluirAdm(req, res) {
    try {
        if(String(req.adm.id) !== "1") {
            return res.status(403).json({
                mensagem: "Você não tem permissão para desativar administradores."
            });
        }

        const { id } = req.params;

        if(String(id) === "1") {
            return res.status(403).json({
                mensagem: "O administrador principal não pode ser desativado."
            });
        }

        const admDesativado = await desativaAdm(id);

        if(!admDesativado) {
            return res.status(404).json({
                mensagem: "Administrador não encontrado"
            });
        }

        return res.status(200).json({
            mensagem: "Adiministrador desativado com sucesso!",
            adm: admDesativado
        });
    } catch (error) {
        console.error("Erro ao desativar administrador:", error);
        
        return res.status(500).json({
            mensagem: "Erro no servidor."
        })
    }
}