import mongoose, { Schema, Document } from "mongoose";
import IUsuario from "../interfaces/usuario";

const SchemaUsuario: Schema = new Schema<IUsuario>(
  {
    nombre: { type: Schema.Types.String, required: true },
    apellidos: { type: Schema.Types.String, required: true },
    correo: { type: Schema.Types.String, required: true, unique: true },
    contra: { type: Schema.Types.String },
    rol: { type: Schema.Types.String, required: true },
    fecha: { type: Schema.Types.String },
    url_foto: { type: Schema.Types.String },
    grupos: {
      type: [Schema.Types.ObjectId],
      ref: "grupos",
    },
    chats_privados: {
      type: [Schema.Types.ObjectId],
      ref: "chats_privados",
    },
    marcas_tiempo: {
      type: [Schema.Types.ObjectId],
      ref: "marcas_tiempo",
    },
  },
  { timestamps: false, versionKey: false }
);

export const UsuarioModel = mongoose.model<IUsuario & Document>(
  "usuarios",
  SchemaUsuario
);
