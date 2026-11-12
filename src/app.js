import express from "express";
import admRoutes from "./routes/admRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/admin", admRoutes);

export default app;