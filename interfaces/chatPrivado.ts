import { Document, Schema } from "mongoose";

export default interface IChatPrivado extends Document {
  emisor: Schema.Types.ObjectId;
  receptor: Schema.Types.ObjectId;
  mensajes: [Schema.Types.ObjectId];
}
