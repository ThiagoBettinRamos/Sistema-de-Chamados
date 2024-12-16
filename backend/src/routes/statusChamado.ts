import { Router } from "express";
import {
  criarStatus,
} from "../controllers/statusController";

const router = Router();

router.post("/", criarStatus);

export default router;
