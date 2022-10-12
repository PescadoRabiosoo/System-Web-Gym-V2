import { Component, Input, OnInit } from '@angular/core';
import { CursoPresencial } from 'src/app/models/curso-presencial.model';
import { VerCursoService } from './ver-curso.service';

@Component({
  selector: 'app-ver-curso',
  templateUrl: './ver-curso.component.html',
  styleUrls: ['./ver-curso.component.css']
})
export class VerCursoComponent implements OnInit {

  @Input() curso: CursoPresencial;
  titulo: string = 'Curso N° '

  constructor(public verCursoService: VerCursoService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.verCursoService.cerrarModal();
  }

}
