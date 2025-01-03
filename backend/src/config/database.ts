import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "SistemaDeChamados",
  password: process.env.DB_PASSWORD || "root",
  port: Number(process.env.DB_PORT) || 5432,
});

pool.connect()
  .then(() =>  console.log(`Banco conectado com sucesso: ${process.env.DB_HOST}:${process.env.DB_PORT}`))
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  });

export default pool;
