import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HoraDisponible } from 'src/app/models/hora-disponible.model';
import { Membresia } from 'src/app/models/membresia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { HoursService } from 'src/app/services/hours.service';
import { RegistroHorarioService } from './registro-horario.service';

@Component({
  selector: 'app-registro-horario',
  templateUrl: './registro-horario.component.html',
  styleUrls: ['./registro-horario.component.css']
})
export class RegistroHorarioComponent implements OnInit {

  @Input() membresia: Membresia;
  @Input() usuario: Usuario;
  titulo: string = 'Registro de Horario'
  horarios: HoraDisponible[]
  horaForm: FormGroup;

  constructor(public registroHorarioService: RegistroHorarioService,
    private hoursService: HoursService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.hoursService.getHoras().subscribe(horas => this.horarios = horas);
  }

  private buildForm() {
    this.horaForm = this.formBuilder.group({
      hora: ['', [Validators.required]],
    })
  }

  save($event) {
    event.preventDefault();
    if (this.horaForm.valid) {
      const value = this.horaForm.value;
      console.log(value.hora.id);
      this.router.navigate([`${'/pago/membresia/' + this.membresia.id + '/' + value.hora.id}`])
      this.cerrarModal();
    } else {
      this.horaForm.markAllAsTouched();
    }
  }


  get horaField() {
    return this.horaForm.get('hora');
  }
  get horaFieldIsValid() {
    return this.horaField.touched && this.horaField.valid;
  }
  get horaFieldIsInvalid() {
    return this.horaField.touched && this.horaField.invalid;
  }

  cerrarModal() {
    this.registroHorarioService.cerrarModal();
  }

}
