import { Router } from "express";
import Chamado from "../models/chamado";
import StatusChamado from "../models/statusChamado";
import Usuario from "../models/usuario";


const router = Router();

// Listar Chamados
router.get("/", async (req, res) => {
  try {
    const chamados = await Chamado.findAll({
      include: [Usuario, StatusChamado],
    });
    res.json(chamados);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar chamados" });
  }
});

export default router;
