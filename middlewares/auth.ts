import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

export const autenticarToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("token-privado");

  if (!token) {
    res.status(401).send({
      exito: false,
      error: "Acceso denegado, no existe token",
    });
  }

  try {
    const decodificacion = jwt.verify(token, "tokenPrivado");
    req.body.usuario = decodificacion;
  } catch (error) {
    res.status(401).send({
      exito: false,
      error: "Debes autenticarte",
    });
  }

  next();
};

export const necesitaPermisos = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.usuario || !req.body.usuario.rol.includes("Administrador")) {
    return res.status(403).send({
      exito: false,
      error: "Acceso denegado",
    });
  }

  next();
};
