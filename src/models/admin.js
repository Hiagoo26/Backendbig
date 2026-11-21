import pool from "../config/database.js";


//procura email no banco
export async function buscarEmail(email) {
    const resultado = await pool.query(
        "SELECT id, nome, email, senha_hash FROM adm WHERE email = $1", [email]
    );

    return resultado.rows[0];
};


//cadastro de adms no bacno
export async function criarAdm(nome, email, senhaHash) {
    const resultado = await pool.query(
        `INSERT INTO adm (nome, email, senha_hash)
         VALUES ($1, $2, $3)
         RETURNING id, nome, email, criado_em`,
        [nome, email, senhaHash]
    );

    return resultado.rows[0];
};

//lista adms
export async function listaAdms(ordem = "DESC") {
    const direcao = ordem === "ASC" ? "ASC" : "DESC";
    const resultado = await pool.query(
        `SELECT id, nome, email, criado_em
        FROM adm
        ORDER BY criado_em ${direcao}`
    );

    return resultado.rows;
};

//atualizar adm
export async function atualizarAdm(nome, email, senhaHash, id) {
    const resultado = await pool.query(
        `UPDATE adm
        SET nome = $1, email = $2, senha_hash = $3
        WHERE id = $4
        RETURNING id, nome, email, criado_em`,
        [nome, email, senhaHash, id]
    );

    return resultado.rows[0];
};

//desativar adm
export async function desativaAdm(id) {
    const resultado = await pool.query(
        `UPDATE adm
        SET ativo = FALSE
        WHERE id = $1
        RETURNING id, nome, email, ativo`, [id]
    );

    return resultado.rows[0];
};