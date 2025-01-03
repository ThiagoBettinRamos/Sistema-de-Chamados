import { Router } from "express";
import {
  criarChamado,
  listarChamados,
  listarChamadosUser,

} from "../controllers/chamadoController";

const router = Router();

router.post("/", criarChamado);
router.get("/", listarChamados)
router.get("/", listarChamadosUser);

export default router;
