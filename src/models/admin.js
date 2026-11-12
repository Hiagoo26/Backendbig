import pool from "../config/database.js";

export async function buscarEmail(email) {
    const resultado = await pool.query(
        "SELECT id, nome, email, senha_hash FROM adm WHERE email = $1", [email]
    );

    return resultado.rows[0];
}