import mongoose, { Schema, Document } from "mongoose";
import IChatPrivado from "../interfaces/chatPrivado";

const SchemaChatPrivado: Schema = new Schema<IChatPrivado>(
  {
    emisor: {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
      required: true,
    },
    receptor: {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
      required: true,
    },
    mensajes: {
      type: [Schema.Types.ObjectId],
      ref: "mensajes",
    },
  },
  { timestamps: false, versionKey: false }
);

export const ChatPrivadoModel = mongoose.model<IChatPrivado & Document>(
  "chats_privados",
  SchemaChatPrivado
);
