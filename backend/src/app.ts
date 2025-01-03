import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import usuarioRoutes from "./routes/usuarioRoutes";
import chamadoRoutes from "./routes/chamados";
import statusChamadoRoutes from "./routes/statusChamado";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "API Sistema de Chamados - Avançada" });
});

app.use("/api/users", usuarioRoutes);
app.use("/api/chamados", chamadoRoutes);
app.use("/api/status", statusChamadoRoutes);

app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(
      `Método: ${Object.keys(middleware.route.methods).join(", ").toUpperCase()} - Rota: ${middleware.route.path}`
    );
  } else if (middleware.name === "router") {
    middleware.handle.stack.forEach((nestedMiddleware) => {
      if (nestedMiddleware.route) {
        console.log(
          `Método: ${Object.keys(nestedMiddleware.route.methods).join(", ").toUpperCase()} - Rota: ${nestedMiddleware.route.path}`
        );
      }
    });
  }
});

export default app;
