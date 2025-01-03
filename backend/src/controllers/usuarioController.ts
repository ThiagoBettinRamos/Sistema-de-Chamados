import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../server";

export const criarUsuario = async (req: Request, res: Response) => {
  try {
    console.log("Dados recebidos para criar usuário:", req.body);

    const { nome, email, senha, isAdmin } = req.body;

    console.log("Verificando se o email já existe no banco de dados:", email);

    const emailCheckQuery = `SELECT id FROM usuarios WHERE email = $1`;
    const emailCheckResult = await pool.query(emailCheckQuery, [email]);

    console.log("Resultado da verificação de email:", emailCheckResult.rows);

    if (emailCheckResult.rows.length > 0) {
      console.log("Email já está em uso:", email);
      return res.status(400).json({ message: "Email já está em uso." });
    }

    console.log("Criando hash para a senha...");
    const hashedPassword = await bcrypt.hash(senha, 10);

    const insertUserQuery = `
      INSERT INTO usuarios (nome, email, senha, isAdmin, data_criacao)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id, nome, email, isAdmin
    `;
    const values = [nome, email, hashedPassword, isAdmin || false];

    console.log("Executando query para inserir usuário:", values);

    const result = await pool.query(insertUserQuery, values);

    console.log("Usuário criado com sucesso:", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao criar usuário:", error.message);
      res.status(500).json({ message: "Erro ao criar usuário.", error: error.message });
    } else {
      console.error("Erro desconhecido ao criar usuário:", error);
      res.status(500).json({ message: "Erro desconhecido." });
    }
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    console.log("Dados recebidos para login:", req.body);

    const { email, senha } = req.body;

    console.log("Buscando usuário pelo email:", email);

    const userQuery = `
      SELECT id, nome, email, senha, isAdmin
      FROM usuarios
      WHERE email = $1
    `;
    const result = await pool.query(userQuery, [email]);

    console.log("Resultado da busca pelo email:", result.rows);

    if (result.rows.length === 0) {
      console.log("Usuário não encontrado:", email);
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const usuario = result.rows[0];

    console.log("Senha fornecida:", senha);
    console.log("Senha armazenada no banco (hash):", usuario.senha);

    console.log("Comparando a senha fornecida com o hash armazenado...");
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    console.log("Senha válida?", senhaValida);

    if (!senhaValida) {
      console.log("Senha inválida para o usuário:", email);
      return res.status(401).json({ message: "Senha incorreta." });
    }

    console.log("Gerando token para o usuário:", usuario.email);
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, isAdmin: usuario.isadmin },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    console.log("Token gerado com sucesso:", token);

    console.log("Login bem-sucedido para:", usuario.email);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao realizar login:", error.message);
      res.status(500).json({ message: "Erro ao realizar login.", error: error.message });
    } else {
      console.error("Erro desconhecido ao realizar login:", error);
      res.status(500).json({ message: "Erro desconhecido." });
    }
  }
};
