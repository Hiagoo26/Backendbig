import pool from "../config/database.js";

export async function buscarImagensAleatorias() {
    const resultado = await pool.query(
        "SELECT * FROM galeria ORDER BY RANDOM() LIMIT 3"
    );
    
    return resultado.rows;
};

export async function buscarImagens(ordem = "DESC") {

    const direcao = ordem === "ASC" ? "ASC" : "DESC";
    const resultado = await pool.query(
        `SELECT * FROM galeria ORDER BY criada_em ${direcao}`
    );

    return resultado.rows;
}