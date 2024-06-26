import { Router } from "express";
import {
  getChatsPrivados,
  getChatPrivado,
  postChatPrivado,
  putChatPrivado,
  deleteChatPrivado,
} from "../controllers/chatPrivado";
import { autenticarToken } from "../middlewares/auth";

const router = Router();

// Rutas para operaciones CRUD de chats privados
router.get("/", [autenticarToken], getChatsPrivados); // Obtener todos los chats privados
router.get("/:id", [autenticarToken], getChatPrivado); // Obtener un chat privado por su ID
router.post("/", [autenticarToken], postChatPrivado); // Crear un nuevo chat privado
router.put("/:id", [autenticarToken], putChatPrivado); // Actualizar un chat privado existente por su ID
router.delete("/:id", [autenticarToken], deleteChatPrivado); // Eliminar un chat privado por su ID

export default router;
