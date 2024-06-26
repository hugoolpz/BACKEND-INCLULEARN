import { Router } from "express";
import {
  getMensajes,
  getMensaje,
  postMensaje,
  putMensaje,
  deleteMensaje,
} from "../controllers/mensaje";
import { autenticarToken } from "../middlewares/auth";

const router = Router();

// Rutas para operaciones CRUD de mensajes
router.get("/", [autenticarToken], getMensajes); // Obtener todos los mensajes
router.get("/:id", [autenticarToken], getMensaje); // Obtener un mensaje por su ID
router.post("/", [autenticarToken], postMensaje); // Crear un nuevo mensaje
router.put("/:id", [autenticarToken], putMensaje); // Actualizar un mensaje existente por su ID
router.delete("/:id", [autenticarToken], deleteMensaje); // Eliminar un mensaje por su ID

export default router;
