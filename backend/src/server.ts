import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Pool } from "pg";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import usuarioRoutes from "./routes/usuarioRoutes";
import chamadoRoutes from "./routes/chamados";
import statusRoutes from "./routes/statusChamado";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "SistemaDeChamados",
  password: process.env.DB_PASSWORD || "root",
  port: Number(process.env.DB_PORT) || 5432,
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

pool.connect()
  .then(() => console.log("Conectado ao banco de dados com sucesso!"))
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  });

app.use("/api/users", usuarioRoutes);
app.use("/api/chamados", chamadoRoutes);
app.use("/api/status", statusRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Bem-vindo ao Sistema de Chamados - Backend" });
});

io.on("connection", (socket) => {
  console.log(`Novo cliente conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app, io, httpServer, pool };
