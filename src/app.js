import express from "express";
import admRoutes from "./routes/admRoutes.js";
import agendamentoRoutes from "./routes/agendamentoRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/admin", admRoutes);
app.use("/api/agendamento", agendamentoRoutes);

export default app;