import { Request, Response } from "express";
import pool from "../server";

export const atualizarStatusChamado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const query = `
      UPDATE chamados
      SET status = $1, data_atualizacao = NOW()
      WHERE id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [status, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Chamado não encontrado." });
    }

    res.status(200).json({ message: "Status atualizado com sucesso!", chamado: result.rows[0] });
  } catch (error) {
    console.error("Erro ao atualizar status do chamado:", error);
    res.status(500).json({ message: "Erro ao atualizar status do chamado." });
  }
};
