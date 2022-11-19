import { Entrenador } from "./entrenador.model";

export class CursoPresencial {
    id: number;
    nombre: string;
    precio: number;
    vacantes: number;
    descripcion: string;
    foto: string;
    enabled: Boolean;
    fechaInicio: string;
    fechaFinal: string;
    horaInicio: string;
    horaFinal: string;
    entrenador: Entrenador;
}
