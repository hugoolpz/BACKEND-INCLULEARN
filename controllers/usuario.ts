import { Request, Response } from "express";
import { UsuarioModel } from "../models/usuario";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { MensajeModel } from "../models/mensaje";
import { GrupoModel } from "../models/grupo";
import { CanalModel } from "../models/canal";
import { ChatPrivadoModel } from "../models/chatPrivado";
import { MarcaTiempoModel } from "../models/marcaTiempo";

const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await UsuarioModel.find()
      .populate("grupos")
      .populate("chats_privados")
      .populate("marcas_tiempo");
    return res.status(200).json({ exito: true, datos: usuarios });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const usuario = await UsuarioModel.findById(id)
      .populate("grupos")
      .populate({
        path: "chats_privados",
        populate: [
          {
            path: "receptor",
            model: "usuarios",
          },
          {
            path: "emisor",
            model: "usuarios",
          },
        ],
      })
      .populate("marcas_tiempo");
    return res.status(200).json({ exito: true, datos: usuario });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const getUsuarioByCorreo = async (req: Request, res: Response) => {
  const { correo } = req.params;

  try {
    const usuario = await UsuarioModel.findOne({ correo: correo });
    return res.status(200).json({ exito: true, datos: usuario });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const postUsuario = async (req: Request, res: Response) => {
  try {
    const {
      nombre,
      apellidos,
      correo,
      contra,
      rol,
      fecha,
      url_foto,
      grupos,
      chats_privados,
      marcas_tiempo,
    } = req.body;

    let contraHash = null;

    if (contra) {
      contraHash = bcrypt.hashSync(contra, 10);
    }

    const usuario = new UsuarioModel({
      _id: new mongoose.Types.ObjectId(),
      nombre,
      apellidos,
      correo,
      contra: contraHash,
      rol,
      fecha,
      url_foto,
      grupos,
      chats_privados,
      marcas_tiempo,
    });

    const nuevoUsuario = await usuario.save();
    return res.status(200).json({ exito: true, datos: nuevoUsuario });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const putUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      nombre,
      apellidos,
      correo,
      contra,
      rol,
      fecha,
      url_foto,
      grupos,
      chats_privados,
      marcas_tiempo,
    } = req.body;

    const usuarioAct = await UsuarioModel.findByIdAndUpdate(id, {
      nombre,
      apellidos,
      correo,
      contra,
      rol,
      fecha,
      url_foto,
      $push: {
        grupos,
        chats_privados,
        marcas_tiempo,
      },
    });
    return res.status(200).json({ exito: true, datos: usuarioAct });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const pullUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      nombre,
      apellidos,
      correo,
      contra,
      rol,
      fecha,
      url_foto,
      grupos,
      chats_privados,
      marcas_tiempo,
    } = req.body;

    const usuarioAct = await UsuarioModel.findByIdAndUpdate(id, {
      nombre,
      apellidos,
      correo,
      contra,
      rol,
      fecha,
      url_foto,
      $pull: {
        grupos,
        chats_privados,
        marcas_tiempo,
      },
    });
    return res.status(200).json({ exito: true, datos: usuarioAct });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuarioElim = await UsuarioModel.findByIdAndDelete(id);
    await MensajeModel.deleteMany({ emisor: id });
    await GrupoModel.updateMany({ miembros: id }, { $pull: { miembros: id } });
    await CanalModel.updateMany({ miembros: id }, { $pull: { miembros: id } });
    await ChatPrivadoModel.deleteMany({
      _id: { $in: usuarioElim?.chats_privados },
    });
    await MarcaTiempoModel.deleteMany({
      _id: { $in: usuarioElim?.marcas_tiempo },
    });
    return res.status(200).json({ exito: true, datos: usuarioElim });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

export {
  getUsuarios,
  getUsuario,
  getUsuarioByCorreo,
  postUsuario,
  putUsuario,
  pullUsuario,
  deleteUsuario,
};
