import { Router } from "express";
import { postAuth } from "../controllers/auth";

const router = Router();

//Establecemos los endpoints de cada solicitud
router.post("/", postAuth);

export default router;
