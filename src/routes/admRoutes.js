import { Router } from "express";
import { login, cadastrarAdm, listarAdms, atualizarAdmin, excluirAdm } from "../controllers/admControler.js";
import { verificarToken } from "../middlewares/verificarToken.js";

const router = Router();

//get
router.get("/listar", verificarToken, listarAdms);
router.get("/token", verificarToken, (req, res) => {
    return res.status(200).json({
        mensagem: "Token válido!",
        admin: req.adm
    });
});

//post
router.post("/login", login);
router.post("/cadastrar", verificarToken, cadastrarAdm);

//put
router.put("/:id", verificarToken, atualizarAdmin);


//delete
router.delete("/:id", verificarToken, excluirAdm);
export default router;