import { Document, Schema } from "mongoose";

export default interface IMensaje extends Document {
  emisor: Schema.Types.ObjectId;
  contenido: Schema.Types.String;
  marca_tiempo: Schema.Types.String;
}
