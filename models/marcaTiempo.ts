import mongoose, { Schema, Document } from "mongoose";
import { IMarcaTiempo } from "../interfaces/marcaTiempo";

const MarcaTiempoSchema: Schema = new Schema<IMarcaTiempo>(
  {
    titulo: { type: Schema.Types.String, required: true },
    detalles: { type: Schema.Types.String, required: true },
    tiempoInicio: { type: Schema.Types.String, required: true },
    tiempoFin: { type: Schema.Types.String, required: true },
    color: { type: Schema.Types.String, required: true },
  },
  { timestamps: false, versionKey: false }
);

export const MarcaTiempoModel = mongoose.model<IMarcaTiempo & Document>(
  "marcas_tiempo",
  MarcaTiempoSchema
);
