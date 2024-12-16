import app from "./app";
import { Pool } from "pg";
import dotenv from "dotenv";

// Carrega variáveis de ambiente
dotenv.config();

// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "SistemaDeChamados",
  password: process.env.DB_PASSWORD || "root",
  port: Number(process.env.DB_PORT) || 5432, // Porta padrão do PostgreSQL
});

// Função para iniciar o servidor
const startServer = async () => {
  try {
    console.log("Tentando conectar ao banco...");
    // Testa a conexão com o banco de dados
    const result = await pool.query("SELECT NOW()");
    console.log(`Banco conectado com sucesso: ${process.env.DB_HOST}:${process.env.DB_PORT}`);


    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
    process.exit(1); // Encerra o processo em caso de erro crítico
  }
};

// Porta onde o servidor irá rodar
const PORT = process.env.PORT || 3000;

// Inicia o servidor
startServer();

// Exporta o pool de conexões para ser usado em outras partes do projeto
export default pool;
