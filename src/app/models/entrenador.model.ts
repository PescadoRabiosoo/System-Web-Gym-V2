import { CursoPresencial } from "./curso-presencial.model";
import { Especialidad } from "./especialidad.model";

export class Entrenador {
    id: number;
    nombre: string;
    apellido: string;
    telefono: number;
    fechaNacimiento: Date;
    foto: string;
    especialidad: Especialidad;
    presenciales: Array<CursoPresencial> = []
}