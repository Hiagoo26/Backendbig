import pool from "../config/database.js";

//criar
export async function criarAgendamento(nome, numero, tatuadorId, data, horario) {
    const resultado = await pool.query(
        `INSERT INTO agendamentos
        (nome_cliente, numero_cliente, tatuador_id, data_agendamento, horario_agendamento)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [nome, numero, tatuadorId, data, horario]
    );

    return resultado.rows[0];
}

//listar
export async function listarAgendamentos() {
    const resultado = await pool.query(
        "SELECT * FROM agendamentos ORDER BY data_agendamento, horario_agendamento"
    );

    return resultado.rows;
}

//conclui
export async function concluirAgendamento(id) {
    const resultado = await pool.query(
        `UPDATE agendamentos
         SET status = 'concluido'
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return resultado.rows[0];
}

//listar concluidos
export async function listarConcluidos() {
    const resultado = await pool.query(
        `SELECT * FROM agendamentos
         WHERE status = 'concluido'
         ORDER BY data_agendamento DESC`
    );

    return resultado.rows;
}


//busca id
export async function buscarAgendamento(id) {
    const resultado = await pool.query(
        `SELECT * FROM agendamentos
         WHERE id = $1`,
        [id]
    );

    return resultado.rows[0];
}

//atualiza
export async function atualizarAgendamento(nome, numero, tatuadorId, data, horario, status, id) {
    const resultado = await pool.query(
        `UPDATE agendamentos
         SET nome_cliente = $1,
             numero_cliente = $2,
             tatuador_id = $3,
             data_agendamento = $4,
             horario_agendamento = $5,
             status = $6
         WHERE id = $7
         RETURNING *`,
        [nome, numero, tatuadorId, data, horario, status, id]
    );

    return resultado.rows[0];
}

//exclui
export async function excluirAgendamento(id) {
    const resultado = await pool.query(
        `DELETE FROM agendamentos
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return resultado.rows[0];
}