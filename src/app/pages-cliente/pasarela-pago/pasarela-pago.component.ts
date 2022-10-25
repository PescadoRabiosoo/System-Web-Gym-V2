import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { ComprobanteMembresia } from 'src/app/models/comprobante-membresia.model';
import { HoraDisponible } from 'src/app/models/hora-disponible.model';
import { Membresia } from 'src/app/models/membresia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ComprobantesService } from 'src/app/services/comprobantes.service';
import { HoursService } from 'src/app/services/hours.service';
import { MembershipsService } from 'src/app/services/memberships.service';

@Component({
  selector: 'app-pasarela-pago',
  templateUrl: './pasarela-pago.component.html',
  styleUrls: ['./pasarela-pago.component.css']
})
export class PasarelaPagoComponent implements OnInit {

  membresia: Membresia;
  hora: HoraDisponible;
  usuario: Usuario;
  tarjetaForm: FormGroup;
  total: number;
  idm: number;
  idh: number;
  comprobante: ComprobanteMembresia = new ComprobanteMembresia();
  comprobanteres: ComprobanteMembresia = new ComprobanteMembresia();

  constructor(private activatedRoute: ActivatedRoute,
    private membershipsService: MembershipsService,
    private hoursService: HoursService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private comprobantesService: ComprobantesService,
    private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    let id = JSON.parse(sessionStorage.getItem('usuario')).id;

    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params)
      if (params.get('membresia') && params.get('id')) {
        this.authService.obtenerUsuario(id).subscribe(params => this.usuario = params);
        this.idm = +params.get('membresia');
        this.idh = +params.get('id');

        this.membershipsService.getMembresia(this.idm).subscribe(params => {
          this.membresia = params;
          this.total = params.precio + (params.precio * 0.18);
        });
        this.hoursService.getHora(this.idh).subscribe(params => this.hora = params);
      } else {
        this.authService.obtenerUsuario(id).subscribe(params => {
          this.usuario = params;
          this.membresia = params.membresia;
          this.hora = params.hora;
          this.total = params.membresia.precio + (params.membresia.precio * 0.18);
        });
      }

    });
  }

  public buildForm() {
    this.tarjetaForm = this.formBuilder.group({
      numero: ['', Validators.required],
      codigo: ['', Validators.required],
      fecha: ['', Validators.required],
    })
  }

  tarjeta($event) {
    event.preventDefault();

    if (this.tarjetaForm.valid) {
      const value = this.tarjetaForm.value;
      var mesFinal = new Date().getMonth().valueOf() + 1 + this.membresia.duracion;
      var anoFinal = new Date().getFullYear().valueOf();
      var fechaFinal = new Date();

      if (mesFinal > 12) {
        mesFinal -= 12;
        fechaFinal.setMonth(mesFinal + 1);
        fechaFinal.setFullYear(anoFinal + 1);
      } else {
        fechaFinal.setMonth(mesFinal + 1);
        fechaFinal.setFullYear(anoFinal + 1);
      }

      this.comprobante.termino = fechaFinal;
      this.comprobante.total = this.total;
      this.comprobante.cliente = this.usuario as Cliente;

      console.log(this.comprobante)
      console.log(anoFinal)
      console.log(mesFinal)
      console.log(fechaFinal)

      try {
        this.comprobantesService.create(this.comprobante, this.idm, this.idh).subscribe(res => this.comprobanteres = res);
        this.router.navigate(['/membresias']);
        console.log(this.comprobanteres)
      } catch (error) {
        console.log('upss')
      }


    } else {
      this.tarjetaForm.markAllAsTouched();
    }


  }

  get numeroField() {
    return this.tarjetaForm.get('numero');
  }
  get numeroFieldIsValid() {
    return this.numeroField.touched && this.numeroField.valid;
  }
  get numeroFieldIsInvalid() {
    return this.numeroField.touched && this.numeroField.invalid;
  }
  get codigoField() {
    return this.tarjetaForm.get('codigo');
  }
  get codigoFieldIsValid() {
    return this.codigoField.touched && this.codigoField.valid;
  }
  get codigoFieldIsInvalid() {
    return this.codigoField.touched && this.codigoField.invalid;
  }
  get fechaField() {
    return this.tarjetaForm.get('fecha');
  }
  get fechaFieldIsValid() {
    return this.fechaField.touched && this.fechaField.valid;
  }
  get fechaFieldIsInvalid() {
    return this.fechaField.touched && this.fechaField.invalid;
  }


}
