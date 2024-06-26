import { Document, Schema } from "mongoose";

export default interface IUsuario extends Document {
  nombre: Schema.Types.String;
  apellidos: Schema.Types.String;
  correo: Schema.Types.String;
  contra: Schema.Types.String;
  rol: Schema.Types.String;
  fecha: Schema.Types.String;
  url_foto: Schema.Types.String;
  grupos: [Schema.Types.ObjectId];
  chats_privados: [Schema.Types.ObjectId];
  marcas_tiempo: [Schema.Types.ObjectId];
}
