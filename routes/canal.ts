import { Router } from "express";
import {
  getCanales,
  getCanal,
  postCanal,
  putCanal,
  deleteCanal,
} from "../controllers/canal";
import { autenticarToken } from "../middlewares/auth";

const router = Router();

// Rutas para operaciones CRUD de canales
router.get("/", [autenticarToken], getCanales); // Obtener todos los canales
router.get("/:id", [autenticarToken], getCanal); // Obtener un canal por su ID
router.post("/", [autenticarToken], postCanal); // Crear un nuevo canal
router.put("/:id", [autenticarToken], putCanal); // Actualizar un canal existente por su ID
router.delete("/:id", [autenticarToken], deleteCanal); // Eliminar un canal por su ID

export default router;
