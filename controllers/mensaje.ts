import { Request, Response } from "express";
import { MensajeModel } from "../models/mensaje";
import mongoose from "mongoose";
import { CanalModel } from "../models/canal";
import { ChatPrivadoModel } from "../models/chatPrivado";

const getMensajes = async (req: Request, res: Response) => {
  try {
    const mensajes = await MensajeModel.find().populate("emisor");
    return res.status(200).json({ exito: true, datos: mensajes });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const getMensaje = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const mensaje = await MensajeModel.findById(id).populate("emisor");
    return res.status(200).json({ exito: true, datos: mensaje });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const postMensaje = async (req: Request, res: Response) => {
  try {
    const { emisor, receptor, contenido, marca_tiempo } = req.body;
    const mensaje = new MensajeModel({
      _id: new mongoose.Types.ObjectId(),
      emisor,
      contenido,
      marca_tiempo,
    });
    const nuevoMensaje = await mensaje.save();
    return res.status(200).json({ exito: true, datos: nuevoMensaje });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const putMensaje = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { emisor, receptor, contenido, marca_tiempo } = req.body;
    const mensajeActualizado = await MensajeModel.findByIdAndUpdate(
      id,
      { emisor, receptor, contenido, marca_tiempo },
      { new: true }
    );
    return res.status(200).json({ exito: true, datos: mensajeActualizado });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const deleteMensaje = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mensajeEliminado = await MensajeModel.findByIdAndDelete(id);
    await CanalModel.updateMany({ mensajes: id }, { $pull: { mensajes: id } });
    await ChatPrivadoModel.updateMany(
      { mensajes: id },
      { $pull: { mensajes: id } }
    );
    return res.status(200).json({ exito: true, datos: mensajeEliminado });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

export { getMensajes, getMensaje, postMensaje, putMensaje, deleteMensaje };
