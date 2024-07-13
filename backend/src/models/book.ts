import { Document, Schema, model } from "mongoose";

export enum Gender {
  ManualYGuias = 'Manual y guías',
  AccionYAventuras = 'Acción y aventuras',
  Aprendizaje = 'Aprendizaje',
  Arte = 'Arte',
  Atlas = 'Atlas',
  Autoayuda = 'Autoayuda',
  Bibliografico = 'Bibliográfico',
  Bricolaje = 'Bricolaje',
  Canciones = 'Canciones',
  CienciaFiccion = 'Ciencia ficción',
  ClasicoEspanol = 'Clásico Español',
  Cocina = 'Cocina',
  Comic = 'Comic',
  Religioso = 'Religioso',
  Cuento = 'Cuento',
  CursoIdioma = 'Curso idioma',
  Diccionario = 'Diccionario',
  Educativo = 'Educativo',
  Deportes = 'Deportes',
  Filosofia = 'Filosofía',
  Botanica = 'Botánica',
  Guerra = 'Guerra',
  Historia = 'Historia',
  Infantil = 'Infantil',
  Novela = 'Novela',
  Paisaje = 'Paisaje',
  Revista = 'Revista',
  Sexualidad = 'Sexualidad',
  Thriller = 'Thriller',
  Otro = 'Otro'
}


/** Definición de la interfaz de documento de libro */
export interface BookDocumentInterface extends Document {
  name: string;
  author: string;
  gender: Gender;
  year: number;
  ubication: string;
}

/** Definición del esquema de Mongoose para libro */
const BookSchema = new Schema<BookDocumentInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
    required: true,
    enum: Object.values(Gender),
  },
  year: {
    type: Number,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error("El año no puede ser negativo");
      }
    },
  },
  ubication: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Book = model<BookDocumentInterface>("Book", BookSchema);