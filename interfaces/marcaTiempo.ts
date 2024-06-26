import { Document, Schema } from "mongoose";

export interface IMarcaTiempo extends Document {
  titulo: Schema.Types.String;
  detalles: Schema.Types.String;
  tiempoInicio: Schema.Types.String;
  tiempoFin: Schema.Types.String;
  color: Schema.Types.String;
}
