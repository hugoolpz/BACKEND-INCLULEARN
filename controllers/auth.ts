import { Request, Response } from "express";
import { UsuarioModel } from "../models/usuario";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

export const postAuth = async (req: Request, res: Response) => {
  const { correo, contra } = req.body;

  const usuario = await UsuarioModel.findOne().where("correo").equals(correo);

  if (usuario) {
    if (bcrypt.compareSync(contra, usuario.contra.toString())) {
      const token = jwt.sign(
        {
          id: usuario._id,
          rol: usuario.rol,
        },
        "tokenPrivado",
        { expiresIn: "2d" }
      );
      res.send({
        exito: true,
        usuario,
        token: token,
      });
    } else {
      res.send({
        exito: false,
        error: "Contraseña incorrecta",
      });
    }
  } else {
    res.status(404).json({
      exito: false,
      error: "No hay registros de un usuario con ese correo",
    });
  }
};
