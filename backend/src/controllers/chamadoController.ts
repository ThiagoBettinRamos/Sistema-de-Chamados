import { Request, Response } from "express";
import pool from "../server";
import { z } from "zod";

const chamadoSchema = z.object({
  usuario_id: z.number().int().positive("O usuário é obrigatório."),
  setor: z.string().min(1, "Setor é obrigatório.").max(100, "Setor deve ter no máximo 100 caracteres."),
  descricao: z.string().min(1, "A descrição é obrigatória."),
});

export const criarChamado = async (req: Request, res: Response) => {
  try {
    const chamadoData = chamadoSchema.parse(req.body);

    const statusPadrao = "Em Espera";

    const insertQuery = `
      INSERT INTO chamados (usuario_id, setor, descricao, status, data_hora, data_atualizacao)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING id, usuario_id, setor, descricao, status, data_hora, data_atualizacao
    `;
    const values = [
      chamadoData.usuario_id,
      chamadoData.setor,
      chamadoData.descricao,
      statusPadrao,
    ];

    const result = await pool.query(insertQuery, values);

    res.status(201).json({ message: "Chamado criado com sucesso!", chamado: result.rows[0] });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Erro de validação.", errors: error.errors });
    }

    console.error("Erro ao criar chamado:", error);
    res.status(500).json({ message: "Erro ao criar chamado." });
  }
};

export const listarChamados = async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT 
        chamados.id, 
        chamados.usuario_id, 
        usuarios.nome AS usuario_nome, 
        chamados.setor, 
        chamados.descricao, 
        chamados.status, 
        chamados.data_hora, 
        chamados.data_atualizacao
      FROM chamados
      JOIN usuarios ON chamados.usuario_id = usuarios.id
      ORDER BY chamados.data_hora DESC
    `;

    const result = await pool.query(query);

    res.status(200).json({ chamados: result.rows });
  } catch (error) {
    console.error("Erro ao listar chamados:", error);
    res.status(500).json({ message: "Erro ao listar chamados." });
  }
};

export const listarChamadosUser = async (req: Request, res: Response) => {
  try {
    const { usuario_id } = req.query;

    if (!usuario_id) {
      return res.status(400).json({ message: "Usuário não especificado." });
    }

    const query = `
      SELECT id, usuario_id, setor, descricao, status, data_hora, data_atualizacao
      FROM chamados
      WHERE usuario_id = $1
      ORDER BY data_hora DESC
    `;

    const result = await pool.query(query, [usuario_id]);

    res.status(200).json({ chamados: result.rows });
  } catch (error) {
    console.error("Erro ao listar chamados do usuário:", error);
    res.status(500).json({ message: "Erro ao listar chamados." });
  }
};
