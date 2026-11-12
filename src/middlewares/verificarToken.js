import jwt from "jsonwebtoken";

export function verificarToken(req, res, next) {
    const cabecalho = req.headers.authorization;

    const token = cabecalho?.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            mensagem: "Token não fornecido."
        });
    }

    try {
        const dadosAdm = jwt.verify(
            token, process.env.JWT_SECRET
        );

        req.admin = dadosAdm;

        next();

    } catch(error) {
         console.log("Erro JWT:", error.message);
        return res.status(401).json({
            mensagem: "Token inválido ou expirado."
        });
    }
}