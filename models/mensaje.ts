import mongoose, { Schema, Document } from "mongoose";
import IMensaje from "../interfaces/mensaje";

const SchemaMensaje: Schema = new Schema<IMensaje>(
  {
    emisor: {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
      required: true,
    },
    contenido: { type: Schema.Types.String, required: true },
    marca_tiempo: { type: Schema.Types.String, required: true },
  },
  { timestamps: false, versionKey: false }
);

export const MensajeModel = mongoose.model<IMensaje & Document>(
  "mensajes",
  SchemaMensaje
);
