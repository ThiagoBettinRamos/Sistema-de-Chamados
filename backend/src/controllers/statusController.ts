import { Request, Response } from "express";
import { z } from "zod";
import sequelize from "../config/database";

const StatusSchema = z.object({
  nome: z.string().min(1, "O nome do status é obrigatório."),
});

export const criarStatus = async (req: Request, res: Response) => {
  try {
    console.log("Dados recebidos para criação de status:", req.body);

    const { nome } = StatusSchema.parse(req.body);

    const [result] = await sequelize.query(
      `INSERT INTO status_chamados (nome) 
       VALUES (?) RETURNING *`,
      { replacements: [nome], type: "INSERT" }
    );

    console.log("Status criado:", result);
    res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao criar status:", error);

    if (error instanceof Error) {
      res.status(400).json({ error: error.message || "Erro ao criar status." });
    } else {
      res.status(400).json({ error: "Erro desconhecido." });
    }
  }
};
