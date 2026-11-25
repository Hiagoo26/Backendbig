import { Router } from "express";
import { verificarToken } from "../middlewares/verificarToken.js";
import { cadastrarAgendamento, listarTodosAgendamentos, listarAgendamentosConcluidos, buscarAgendamentoPorId, editarAgendamento, removerAgendamento, finalizarAgendamento } from "../controllers/agendamentoControler.js";


const router = Router();

router.use(verificarToken);
//get
router.get("/concluidos", listarAgendamentosConcluidos);
router.get("/", listarTodosAgendamentos);
router.get("/:id", buscarAgendamentoPorId);

//post
router.post("/", cadastrarAgendamento);

//put
router.put("/:id", editarAgendamento);

//delete
router.delete("/:id", removerAgendamento);

//patch
router.patch("/:id/concluir", finalizarAgendamento);

export default router;