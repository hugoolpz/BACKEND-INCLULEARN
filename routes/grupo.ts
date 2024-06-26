import { Router } from "express";
import {
  deleteGrupo,
  getGrupo,
  getGrupoByCodigo,
  getGrupos,
  postGrupo,
  pullGrupo,
  putGrupo,
} from "../controllers/grupo";
import { autenticarToken } from "../middlewares/auth";

const router = Router();

//Rutas para operaciones CRUD de grupos
router.get("/", [autenticarToken], getGrupos); //Obtener todos los grupos
router.get("/:id", [autenticarToken], getGrupo); //Obtener un grupo por su ID
router.get("/codigo/:codigo", [autenticarToken], getGrupoByCodigo); //Obtener un grupo por su ID
router.post("/", [autenticarToken], postGrupo); //Crear un nuevo grupo
router.put("/:id", [autenticarToken], putGrupo); //Actualizar un grupo existente por su ID
router.put("/pull/:id", [autenticarToken], pullGrupo); //Actualizar un grupo existente por su ID
router.delete("/:id", [autenticarToken], deleteGrupo); //Eliminar un grupo por su ID

export default router;
