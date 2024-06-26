import { Document, Schema } from "mongoose";

export default interface ICanal extends Document {
  creador: Schema.Types.ObjectId;
  nombre: Schema.Types.String;
  descripcion: Schema.Types.String;
  mensajes: [Schema.Types.ObjectId];
}
