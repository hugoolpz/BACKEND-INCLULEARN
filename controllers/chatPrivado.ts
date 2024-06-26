import { Request, Response } from "express";
import { ChatPrivadoModel } from "../models/chatPrivado";
import mongoose from "mongoose";
import { UsuarioModel } from "../models/usuario";
import { MensajeModel } from "../models/mensaje";

const getChatsPrivados = async (req: Request, res: Response) => {
  try {
    const chatsPrivados = await ChatPrivadoModel.find()
      .populate("emisor")
      .populate("receptor")
      .populate("mensajes");
    return res.status(200).json({ exito: true, datos: chatsPrivados });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const getChatPrivado = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const chatPrivado = await ChatPrivadoModel.findById(id).populate({
      path: "mensajes",
      populate: [
        {
          path: "emisor",
          model: "usuarios",
        },
      ],
    });
    return res.status(200).json({ exito: true, datos: chatPrivado });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const postChatPrivado = async (req: Request, res: Response) => {
  try {
    const { emisor, receptor, mensajes } = req.body;
    const chatPrivado = new ChatPrivadoModel({
      _id: new mongoose.Types.ObjectId(),
      emisor,
      receptor,
      mensajes,
    });
    const nuevoChatPrivado = await chatPrivado.save();
    return res.status(200).json({ exito: true, datos: nuevoChatPrivado });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const putChatPrivado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { emisor, receptor, mensajes } = req.body;
    const chatPrivadoActualizado = await ChatPrivadoModel.findByIdAndUpdate(
      id,
      { emisor, receptor, $push: { mensajes } },
      { new: true }
    );
    return res.status(200).json({ exito: true, datos: chatPrivadoActualizado });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

const deleteChatPrivado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const chatPrivadoEliminado = await ChatPrivadoModel.findByIdAndDelete(id);
    await UsuarioModel.updateMany(
      { chats_privados: id },
      { $pull: { chats_privados: id } }
    );
    await MensajeModel.deleteMany({
      _id: { $in: chatPrivadoEliminado?.mensajes },
    });
    return res.status(200).json({ exito: true, datos: chatPrivadoEliminado });
  } catch (error) {
    return res.status(500).json({ exito: false, error });
  }
};

export {
  getChatsPrivados,
  getChatPrivado,
  postChatPrivado,
  putChatPrivado,
  deleteChatPrivado,
};
