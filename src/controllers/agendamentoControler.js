import { criarAgendamento, listarAgendamentos, listarConcluidos, buscarAgendamento, atualizarAgendamento, excluirAgendamento,  concluirAgendamento } from "../models/agendamento.js";

//Criar
export async function cadastrarAgendamento(req, res) {
    try {
        const { nome_cliente, numero_cliente, tatuador_id, data_agendamento, horario_agendamento } = req.body;

        if (!nome_cliente || !numero_cliente || !tatuador_id || !data_agendamento || !horario_agendamento) {
            return res.status(400).json({
                mensagem: "Preencha todos os campos."
            });
        }

        const novoAgendamento = await criarAgendamento(
            nome_cliente,
            numero_cliente,
            tatuador_id,
            data_agendamento,
            horario_agendamento
        );

        return res.status(201).json({
            mensagem: "Agendamento criado com sucesso!",
            agendamento: novoAgendamento
        });

    } catch (error) {
        console.error("Erro ao criar agendamento:", error);

        return res.status(500).json({
            mensagem: "Erro no servidor."
        });
    }
}

//Listar agendamentos
export async function listarTodosAgendamentos(req, res) {
    try {
        const agendamentos = await listarAgendamentos();

        return res.status(200).json(agendamentos);

    } catch (error) {
        console.error("Erro ao listar agendamentos:", error);

        return res.status(500).json({
            mensagem: "Erro no servidor."
        });
    }
}


// Concluir agendamento
export async function finalizarAgendamento(req, res) {
    try {
        const { id } = req.params;

        const agendamento = await concluirAgendamento(id);

        if (!agendamento) {
            return res.status(404).json({
                mensagem: "Agendamento não encontrado."
            });
        }

        return res.status(200).json({
            mensagem: "Agendamento concluído com sucesso!",
            agendamento
        });

    } catch (error) {
        console.error("Erro ao concluir agendamento:", error);

        return res.status(500).json({
            mensagem: "Erro no servidor."
        });
    }
}

//Listar concluídos
export async function listarAgendamentosConcluidos(req, res) {
    try {
        const concluidos = await listarConcluidos();

        return res.status(200).json(concluidos);

    } catch (error) {
        console.error("Erro ao listar concluídos:", error);

        return res.status(500).json({
            mensagem: "Erro no servidor."
        });
    }
}

//Busca ID
export async function buscarAgendamentoPorId(req, res) {
    try {
        const { id } = req.params;

        const agendamento = await buscarAgendamento(id);

        if (!agendamento) {
            return res.status(404).json({
                mensagem: "Agendamento não encontrado."
            });
        }

        return res.status(200).json(agendamento);

    } catch (error) {
        console.error("Erro ao buscar agendamento:", error);

        return res.status(500).json({
            mensagem: "Erro no servidor."
        });
    }
}

//Atualizar agendamento
export async function editarAgendamento(req, res) {
    try {
        const { id } = req.params;
        const { nome_cliente, numero_cliente, tatuador_id, data_agendamento, horario_agendamento, status } = req.body;

        if (!nome_cliente || !numero_cliente || !tatuador_id || !data_agendamento || !horario_agendamento || !status) {
            return res.status(400).json({
                mensagem: "Preencha todos os campos."
            });
        }

        const agendamentoAtualizado = await atualizarAgendamento(
            nome_cliente,
            numero_cliente,
            tatuador_id,
            data_agendamento,
            horario_agendamento,
            status,
            id
        );

        if (!agendamentoAtualizado) {
            return res.status(404).json({
                mensagem: "Agendamento não encontrado."
            });
        }

        return res.status(200).json({
            mensagem: "Agendamento atualizado com sucesso!",
            agendamento: agendamentoAtualizado
        });

    } catch (error) {
        console.error("Erro ao atualizar agendamento:", error);

        return res.status(500).json({
            mensagem: "Erro no servidor."
        });
    }
}

//Excluir agendamento
export async function removerAgendamento(req, res) {
    try {
        const { id } = req.params;

        const agendamentoExcluido = await excluirAgendamento(id);

        if (!agendamentoExcluido) {
            return res.status(404).json({
                mensagem: "Agendamento não encontrado."
            });
        }

        return res.status(200).json({
            mensagem: "Agendamento excluído com sucesso!",
            agendamento: agendamentoExcluido
        });

    } catch (error) {
        console.error("Erro ao excluir agendamento:", error);

        return res.status(500).json({
            mensagem: "Erro no servidor."
        });
    }
}