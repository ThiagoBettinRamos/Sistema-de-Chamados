import { Router } from "express";
import { atualizarStatusChamado } from "../controllers/statusController";

const router = Router();

router.patch("/:id", atualizarStatusChamado);

export default router;
