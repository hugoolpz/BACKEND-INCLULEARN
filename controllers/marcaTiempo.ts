import { Request, Response } from "express";
import mongoose from "mongoose";
import { MarcaTiempoModel } from "../models/marcaTiempo";

const getMarcas = async (req: Request, res: Response) => {
  try {
    const marcas = await MarcaTiempoModel.find();
    return res.status(200).json({ exito: true, datos: marcas });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const getMarca = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const marca = await MarcaTiempoModel.findById(id);
    return res.status(200).json({ exito: true, datos: marca });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const postMarca = async (req: Request, res: Response) => {
  try {
    const { titulo, detalles, tiempoInicio, tiempoFin, color } = req.body;

    const marca = new MarcaTiempoModel({
      _id: new mongoose.Types.ObjectId(),
      titulo,
      detalles,
      tiempoInicio,
      tiempoFin,
      color,
    });

    const nuevaMarca = await marca.save();
    return res.status(200).json({ exito: true, datos: nuevaMarca });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const putMarca = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { titulo, detalles, tiempoInicio, tiempoFin, color } = req.body;

    const marcaAct = await MarcaTiempoModel.findByIdAndUpdate(id, {
      titulo,
      detalles,
      tiempoInicio,
      tiempoFin,
      color,
    });
    return res.status(200).json({ exito: true, datos: marcaAct });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const deleteMarca = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const marcaElim = await MarcaTiempoModel.findByIdAndDelete(id);
    return res.status(200).json({ exito: true, datos: marcaElim });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

export { getMarcas, getMarca, postMarca, putMarca, deleteMarca };
