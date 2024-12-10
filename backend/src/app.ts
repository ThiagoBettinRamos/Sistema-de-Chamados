import express, { Application } from "express";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import routes from "./routes/chamados";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Conexão ao banco de dados bem-sucedida!"))
  .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));

const app: Application = express();

app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;
