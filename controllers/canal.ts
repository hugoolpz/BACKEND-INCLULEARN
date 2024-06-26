import { Request, Response } from "express";
import { CanalModel } from "../models/canal";
import mongoose from "mongoose";
import { UsuarioModel } from "../models/usuario";
import { MensajeModel } from "../models/mensaje";

const getCanales = async (req: Request, res: Response) => {
  try {
    const canales = await CanalModel.find().populate({
      path: "mensajes",
      populate: {
        path: "emisor",
        model: "usuarios",
      },
    });
    return res.status(200).json({ exito: true, datos: canales });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const getCanal = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const canal = await CanalModel.findById(id).populate({
      path: "mensajes",
      populate: {
        path: "emisor",
        model: "usuarios",
      },
    });
    return res.status(200).json({ exito: true, datos: canal });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const postCanal = async (req: Request, res: Response) => {
  try {
    const { creador, nombre, descripcion, mensajes } = req.body;

    const canal = new CanalModel({
      _id: new mongoose.Types.ObjectId(),
      creador,
      nombre,
      descripcion,
      mensajes,
    });

    const nuevoCanal = await canal.save();
    return res.status(200).json({ exito: true, datos: nuevoCanal });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const putCanal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { creador, nombre, descripcion, mensajes } = req.body;

    const canalAct = await CanalModel.findByIdAndUpdate(id, {
      creador,
      nombre,
      descripcion,
      $push: {
        mensajes,
      },
    });
    return res.status(200).json({ exito: true, datos: canalAct });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const deleteCanal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const canalElim = await CanalModel.findByIdAndDelete(id);
    await UsuarioModel.updateMany({ canales: id }, { $pull: { canales: id } });
    await MensajeModel.deleteMany({ _id: { $in: canalElim?.mensajes } });
    return res.status(200).json({ exito: true, datos: canalElim });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

export { getCanales, getCanal, postCanal, putCanal, deleteCanal };
