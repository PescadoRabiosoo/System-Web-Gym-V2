import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';
import { AddCustomerService } from './add-customer/add-customer.service';
import { EditCustomerService } from './edit-customer/edit-customer.service';
import { ImgCustomerService } from './img-customer/img-customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: [
  ]
})
export class CustomersComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;
  search: string = '';
  pages: number = 0;

  public cargando: Boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
    private customersService: CustomersService,
    public authService: AuthService,
    public addCustomerService: AddCustomerService,
    public editCustomerService: EditCustomerService,
    public imgCustomerService: ImgCustomerService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.customersService.getClientes(page)
        .subscribe(
          response => {
            this.clientes = response.content as Cliente[]
            this.paginador = response;
          }
        )
    });

    this.addCustomerService.notificarUpload.subscribe(cliente => {
      this.clientes.push(cliente);
    });

    this.editCustomerService.notificarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal = cliente;
        }
        return clienteOriginal;
      });
    });

    this.imgCustomerService.notificarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      });
    });

    setTimeout(() => {
      this.cargando = false;
    }, 2000);
  }

  disabled(cliente: Cliente) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-primary',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea deshabilitar al cliente ${cliente.nombre} ${cliente.apellido}?, no podrá acceder a su cuenta`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deshabilitar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientes.map(cli => {
          if (cli.id == cliente.id) {
            cli.enabled = false;
          }
          return cli;
        })
        this.customersService.disabled(cliente.id).subscribe(
          response => {
            swalWithBootstrapButtons.fire(
              'Cliente Deshabilitado!',
              `Cliente ${cliente.nombre} deshabilitado con exito`,
              'success'
            )
          }
        )
      }
    })
  }

  enabled(cliente: Cliente) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-primary',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea habilitar al cliente ${cliente.nombre} ${cliente.apellido}?, tendrá acceso a su cuenta`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, habilitar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientes.map(cli => {
          if (cli.id == cliente.id) {
            cli.enabled = true;
          }
          return cli;
        })
        this.customersService.enabled(cliente.id).subscribe(
          response => {
            swalWithBootstrapButtons.fire(
              'Cliente Habilitado!',
              `Cliente ${cliente.nombre} habilitado con exito`,
              'success'
            )
          }
        )
      }
    })

  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-primary',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.customersService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con exito`,
              'success'
            )
          }
        )
      }
    })
  }

  btnSearchCliente(search: string) {
    if (search != '') {
      this.customersService.getClientesAll().subscribe(clientes =>
        this.clientes = clientes
      )
    }
    else {
      this.customersService.getClientes(0).subscribe(response => {
        this.clientes = response.content as Cliente[]
        this.paginador = response;
      })
    }
    this.search = search;
  }

  anterior() {
    if (this.pages > 0)
      this.pages -= 6;
  }

  siguiente() {
    this.pages += 6;
  }

  abrirModal() {
    this.addCustomerService.abrirModal();
  }

  abrirModalEdit(cliente: Cliente) {
    this.editCustomerService.abrirModal();
    this.clienteSeleccionado = cliente;
  }

  abrirModalImg(cliente: Cliente) {
    this.imgCustomerService.abrirModal();
    this.clienteSeleccionado = cliente;
  }

}
