import { Request, Response } from "express";
import { GrupoModel } from "../models/grupo";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UsuarioModel } from "../models/usuario";
import { CanalModel } from "../models/canal";

const getGrupos = async (req: Request, res: Response) => {
  try {
    const grupos = await GrupoModel.find()
      .populate("creador")
      .populate("miembros")
      .populate("canales");
    return res.status(200).json({ exito: true, datos: grupos });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const getGrupo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const grupo = await GrupoModel.findById(id)
      .populate("creador")
      .populate("miembros")
      .populate("canales");
    return res.status(200).json({ exito: true, datos: grupo });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const getGrupoByCodigo = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const grupo = await GrupoModel.findOne({ codigo_acceso: codigo })
      .populate("creador")
      .populate("miembros")
      .populate("canales");
    return res.status(200).json({ exito: true, datos: grupo });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const postGrupo = async (req: Request, res: Response) => {
  try {
    const {
      creador,
      nombre,
      descripcion,
      icono,
      color,
      codigo_acceso,
      miembros,
      canales,
    } = req.body;

    let codigoNuevo = bcrypt.hashSync(codigo_acceso, 10).slice(0, 10);

    const grupo = new GrupoModel({
      _id: new mongoose.Types.ObjectId(),
      creador,
      nombre,
      descripcion,
      codigo_acceso: codigoNuevo,
      icono,
      color,
      miembros,
      canales,
    });
    const nuevoGrupo = await grupo.save();
    return res.status(200).json({ exito: true, datos: nuevoGrupo });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const putGrupo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      nombre,
      descripcion,
      codigo_acceso,
      icono,
      color,
      miembros,
      canales,
    } = req.body;

    const grupoActualizado = await GrupoModel.findByIdAndUpdate(
      id,
      {
        nombre,
        descripcion,
        codigo_acceso,
        icono,
        color,
        $push: { miembros, canales },
      },
      { new: true }
    );
    return res.status(200).json({ exito: true, datos: grupoActualizado });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const pullGrupo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      nombre,
      descripcion,
      codigo_acceso,
      icono,
      color,
      miembros,
      canales,
    } = req.body;

    const grupoActualizado = await GrupoModel.findByIdAndUpdate(
      id,
      {
        nombre,
        descripcion,
        codigo_acceso,
        icono,
        color,
        $pull: { miembros, canales },
      },
      { new: true }
    );
    return res.status(200).json({ exito: true, datos: grupoActualizado });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const deleteGrupo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const grupoEliminado = await GrupoModel.findByIdAndDelete(id);

    await UsuarioModel.updateMany({ grupos: id }, { $pull: { grupos: id } });
    await CanalModel.deleteMany({ _id: { $in: grupoEliminado?.canales } });
    return res.status(200).json({ exito: true, datos: grupoEliminado });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

export {
  getGrupos,
  getGrupo,
  getGrupoByCodigo,
  postGrupo,
  putGrupo,
  pullGrupo,
  deleteGrupo,
};
