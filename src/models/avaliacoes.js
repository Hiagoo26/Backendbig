import pool from "../config/database.js";

export async function buscarAvaliacoesAleatorias() {
    const resultado = await pool.query(
        "SELECT * FROM avaliacoes ORDER BY RANDOM() LIMIT 3"
    );

    return resultado.rows;
    
}

export async function buscarAvaliacoes(ordernarPor = "data", ordem = "DESC") {
    const coluna = ordernarPor === "nota" ? "nota" : "criada_em";
    const direcao = ordem === "ASC" ? "ASC" : "DESC";

    const resultado = await pool.query(
        `SELECT * FROM avaliacoes ORDER BY ${coluna} ${direcao}`
    );

    return resultado.rows;
}