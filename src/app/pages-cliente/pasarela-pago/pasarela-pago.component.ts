import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { ComprobanteCurso } from 'src/app/models/comprobante-curso.model';
import { ComprobanteMembresia } from 'src/app/models/comprobante-membresia.model';
import { ComprobanteProducto } from 'src/app/models/comprobante-producto.model';
import { HoraDisponible } from 'src/app/models/hora-disponible.model';
import { ItemComprobanteCurso } from 'src/app/models/item-comprobante-curso.model';
import { ItemComprobanteProducto } from 'src/app/models/item-comprobante-producto.model';
import { Membresia } from 'src/app/models/membresia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ComprobantesService } from 'src/app/services/comprobantes.service';
import { HoursService } from 'src/app/services/hours.service';
import { MembershipsService } from 'src/app/services/memberships.service';
import Swal from 'sweetalert2';

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
  subtotal: number = 0;
  total: number = 0;
  idm: number;
  idh: number;
  comprobante: ComprobanteMembresia = new ComprobanteMembresia();
  comprobanteres: ComprobanteMembresia = new ComprobanteMembresia();
  carrito: ItemComprobanteProducto[] = [];
  carritoC: ItemComprobanteCurso[] = [];
  stateMembership: Boolean;
  comprobanteP: ComprobanteProducto = new ComprobanteProducto();
  comprobanteC: ComprobanteCurso = new ComprobanteCurso();
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(private activatedRoute: ActivatedRoute,
    private membershipsService: MembershipsService,
    private hoursService: HoursService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private comprobantesService: ComprobantesService,
    private router: Router,
    private carritoService: CarritoService) {
    this.buildForm();
  }

  ngOnInit(): void {
    let id = JSON.parse(sessionStorage.getItem('usuario')).id;

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('membresia') && params.get('id')) {
        this.authService.obtenerUsuario(id).subscribe(params => this.usuario = params);
        this.idm = +params.get('membresia');
        this.idh = +params.get('id');
        this.stateMembership = true;
        this.membershipsService.getMembresia(this.idm).subscribe(params => {
          this.membresia = params;
          this.total = params.precio;
        });
        this.hoursService.getHora(this.idh).subscribe(params => this.hora = params);
      } else if (params.get('user')) {
        this.authService.obtenerUsuario(id).subscribe(params => {
          this.usuario = params;
          this.membresia = params.membresia;
          this.hora = params.hora;
          this.total = params.membresia.precio;
          this.stateMembership = true;
        });
      } else {
        this.authService.obtenerUsuario(id).subscribe(params => this.usuario = params);
        this.carritoService.obtenerDatos(id).subscribe(data => {
          data.forEach(item => {
            var nuevoItem = new ItemComprobanteProducto();
            var nuevoItemC = new ItemComprobanteCurso();
            if (item.curso === null) {
              nuevoItem.producto = item.producto;
              nuevoItem.cantidad = item.cantidad;
              nuevoItem.importe = item.cantidad * item.producto.precio;
              this.carrito.push(nuevoItem);
            } else {
              nuevoItemC.curso = item.curso;
              nuevoItemC.importe = item.curso.precio;
              this.carritoC.push(nuevoItemC);
            }
          })
          this.carrito.forEach(ele => {
            this.subtotal += ele.importe;
          })
          this.carritoC.forEach(ele => {
            this.subtotal += ele.importe;
          })
          this.stateMembership = false;
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

      if (this.stateMembership == true) {
        var mesFinal = new Date().getMonth().valueOf() + 1 + this.membresia.duracion;
        var anoFinal = new Date().getFullYear().valueOf();
        var fechaFinal = new Date();

        if (mesFinal > 12) {
          mesFinal -= 12;
          fechaFinal.setMonth(mesFinal - 1);
          fechaFinal.setFullYear(anoFinal + 1);
        } else {
          fechaFinal.setMonth(mesFinal - 1);
          fechaFinal.setFullYear(anoFinal);
        }

        this.comprobante.termino = fechaFinal;
        this.comprobante.total = this.total;
        this.comprobante.cliente = this.usuario as Cliente;

        try {
          let membresia = this.idm || this.usuario.membresia.id;
          let hora = this.idh || this.usuario.hora.id;
          this.comprobantesService.create(this.comprobante, this.idm == undefined ? this.usuario.membresia.id : this.idm, this.idh == undefined ? this.usuario.hora.id : this.idh).subscribe(res => {
            this.comprobanteres = res;
            Swal.fire('Pago realizado', `El Pago se ha realizado correctamente`, `success`)
          });
          this.router.navigate(['/membresias']);
        } catch (error) {
          console.log('upss')
        }
      } else if (this.stateMembership == false) {

        this.comprobanteP.cliente = this.usuario;
        this.comprobanteC.cliente = this.usuario;
        this.comprobanteP.items = this.carrito;
        this.comprobanteC.items = this.carritoC;
        this.comprobanteP.total = 0;
        this.carrito.forEach(ele => {
          this.comprobanteP.total += ele.importe;
        })
        this.comprobanteC.total = 0;
        this.carritoC.forEach(ele => {
          this.comprobanteC.total += ele.importe;
        })
        this.comprobanteP.descripcion = 'Pago realizado exitosamente con tarjeta ' + value.numero;
        this.comprobanteP.mes = this.meses[new Date().getMonth().valueOf()];
        this.comprobanteC.mes = this.meses[new Date().getMonth().valueOf()];

        if (this.comprobanteP.items.length > 0) {
          this.comprobantesService.generarCompra(this.comprobanteP).subscribe(res => {
            console.log(res)
          });
        }
        if (this.comprobanteC.items.length > 0) {
          this.comprobantesService.generarCompraC(this.comprobanteC).subscribe(res => {
            console.log(res)
          })
        }
        this.carritoService.obtenerDatos(this.usuario.id).subscribe(res => {
          res.forEach(item => {
            this.carritoService.eliminarItem(item.id).subscribe(res => console.log(res));
          })
        })
        if (this.comprobanteC.items.length + this.comprobanteP.items.length > 0) {

          Swal.fire('Pago realizado', `El Pago se ha realizado correctamente`, `success`);
          this.router.navigate(['/espacio']);
        } else {
          Swal.fire('Fallo de Operacion', 'No se realizo ningun procedimiento', 'error');
          this.router.navigate(['/espacio']);
        }
      }
    }
    else {
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
