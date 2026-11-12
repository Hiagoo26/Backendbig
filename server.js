import app from "./src/app.js";
import pool from "./src/config/database.js"

const PORT = 2611;

pool.query("SELECT NOW()")
    .then(() => console.log("PostgreSQL conectado!"))
    .catch((error) => console.error(`Erro na conexão, ${error}`))

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});