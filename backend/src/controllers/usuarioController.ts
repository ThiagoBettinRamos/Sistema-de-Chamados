import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../server"; 

export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, isAdmin } = req.body;

    const emailCheckQuery = `SELECT id FROM usuarios WHERE email = $1`;
    const emailCheckResult = await pool.query(emailCheckQuery, [email]);

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ message: "Email já está em uso." });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const insertUserQuery = `
      INSERT INTO usuarios (nome, email, senha, isAdmin, data_criacao)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id, nome, email, isAdmin
    `;
    const values = [nome, email, hashedPassword, isAdmin || false];
    const result = await pool.query(insertUserQuery, values);

    console.log("Usuário criado:", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao criar usuário:", error.message);
      res.status(500).json({ message: "Erro ao criar usuário.", error: error.message });
    } else {
      console.error("Erro desconhecido:", error);
      res.status(500).json({ message: "Erro desconhecido." });
    }
  }
  
};

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const userQuery = `
      SELECT id, nome, email, senha, isAdmin
      FROM usuarios
      WHERE email = $1
    `;
    const result = await pool.query(userQuery, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const usuario = result.rows[0];

    console.log("Senha fornecida:", senha);
    console.log("Senha armazenada (hash):", usuario.senha);

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    console.log("Senha válida?", senhaValida);

    if (!senhaValida) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, isAdmin: usuario.isAdmin },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    console.log("Login bem-sucedido para:", usuario.email);

    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao realizar login:", error.message);
      res.status(500).json({ message: "Erro ao realizar login.", error: error.message });
    } else {
      console.error("Erro desconhecido:", error);
      res.status(500).json({ message: "Erro desconhecido." });
    }
  }
  
};
