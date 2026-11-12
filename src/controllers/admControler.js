import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { buscarEmail } from "../models/admin.js";

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
            mensagem: "Erro interno no servidor."
        })
    }
}

