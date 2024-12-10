import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";
import chamadoRoutes from "./routes/chamados";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/chamados", chamadoRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco bem-sucedida.");
    app.listen(5000, () => {
      console.log("Servidor rodando em http://localhost:5000");
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
};

startServer();
