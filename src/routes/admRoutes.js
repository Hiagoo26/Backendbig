import { Router } from "express";
import { login } from "../controllers/admControler.js";
import { verificarToken } from "../middlewares/verificarToken.js";

const router = Router();

router.post("/login", login);
router.get("/teste-token", verificarToken, (req, res) => {
    return res.status(200).json({
        mensagem: "Token válido! Administrador autenticado.",
        admin: req.admin
    });
});

export default router