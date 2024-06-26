import { Router } from "express";
import {
  getUsuarios,
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
  pullUsuario,
  getUsuarioByCorreo,
} from "../controllers/usuario";
import { autenticarToken, necesitaPermisos } from "../middlewares/auth";

const router = Router();

//Rutas para operaciones CRUD de usuarios
router.get("/", getUsuarios); //Obtener todos los usuarios
router.get("/:id", getUsuario); //Obtener un usuario por su ID
router.get("/correo/:correo", [autenticarToken], getUsuarioByCorreo); //Obtener un usuario por su correo
router.post("/", postUsuario); //Crear un nuevo usuario
router.put("/:id", [autenticarToken], putUsuario); //Actualizar un usuario existente por su ID
router.put("/pull/:id", [autenticarToken], pullUsuario); //Actualizar un usuario existente por su ID
router.delete("/:id", [autenticarToken, necesitaPermisos], deleteUsuario); //Eliminar un usuario por su ID

export default router;
