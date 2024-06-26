import { Router } from "express";
import {
  deleteMarca,
  getMarca,
  getMarcas,
  postMarca,
  putMarca,
} from "../controllers/marcaTiempo";
import { autenticarToken } from "../middlewares/auth";

const router = Router();

//Rutas para operaciones CRUD de marcas
router.get("/", [autenticarToken], getMarcas); //Obtener todos los marcas
router.get("/:id", [autenticarToken], getMarca); //Obtener un marca por su ID
router.post("/", [autenticarToken], postMarca); //Crear un nuevo marca
router.put("/:id", [autenticarToken], putMarca); //Actualizar un marca existente por su ID
router.delete("/:id", [autenticarToken], deleteMarca); //Eliminar un marca por su ID

export default router;
