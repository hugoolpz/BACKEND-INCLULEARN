import { Document, Schema } from "mongoose";

export default interface IGrupo extends Document {
  creador: Schema.Types.ObjectId;
  nombre: Schema.Types.String;
  descripcion: Schema.Types.String;
  codigo_acceso: Schema.Types.String;
  miembros: [Schema.Types.ObjectId];
  icono: Schema.Types.String;
  color: Schema.Types.String;
  canales: [Schema.Types.ObjectId];
}
