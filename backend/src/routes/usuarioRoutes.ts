import { Router } from "express";
import { criarUsuario, loginUsuario } from "../controllers/usuarioController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", criarUsuario);
router.post("/login", loginUsuario);

export default router;
