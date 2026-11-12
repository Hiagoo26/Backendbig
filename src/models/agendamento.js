import pool from "../config/database.js";

export async function listarAgendamentos() {
    const resultado = await pool.query(
        "SELECT * FROM agendamentos ORDER BY data_agendamento, horario_agendamento"
    );

    return resultado.rows;
}