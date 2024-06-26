import mongoose, { Schema, Document } from "mongoose";
import ICanal from "../interfaces/canal";

const SchemaCanal: Schema = new Schema<ICanal>(
  {
    creador: { type: Schema.Types.ObjectId, required: true },
    nombre: { type: Schema.Types.String, required: true },
    descripcion: { type: Schema.Types.String, required: true },
    mensajes: {
      type: [Schema.Types.ObjectId],
      ref: "mensajes",
    },
  },
  { timestamps: false, versionKey: false }
);

export const CanalModel = mongoose.model<ICanal & Document>(
  "canales",
  SchemaCanal
);
