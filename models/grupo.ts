import mongoose, { Schema, Document } from "mongoose";
import IGrupo from "../interfaces/grupo";

const SchemaGrupo: Schema = new Schema<IGrupo>(
  {
    creador: {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
    },
    nombre: { type: Schema.Types.String, required: true },
    descripcion: { type: Schema.Types.String, required: true },
    codigo_acceso: { type: Schema.Types.String, required: true },
    miembros: {
      type: [Schema.Types.ObjectId],
      ref: "usuarios",
    },
    icono: { type: Schema.Types.String },
    color: { type: Schema.Types.String },
    canales: {
      type: [Schema.Types.ObjectId],
      ref: "canales",
    },
  },
  { timestamps: false, versionKey: false }
);

export const GrupoModel = mongoose.model<IGrupo & Document>(
  "grupos",
  SchemaGrupo
);
