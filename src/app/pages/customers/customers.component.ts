import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';
import { AddCustomerService } from './add-customer/add-customer.service';
import { EditCustomerService } from './edit-customer/edit-customer.service';

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

  constructor(private customersService: CustomersService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public addCustomerService: AddCustomerService,
    public editCustomerService: EditCustomerService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.customersService.getClientesAll()
        .subscribe(
          clientes => {
            this.clientes = clientes
          }
        )
    });

    this.addCustomerService.notificarUpload.subscribe(cliente => {

      this.clientes = this.clientes.map(clienteOriginal => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.foto = cliente.foto;
        }
        console.log(clienteOriginal)
        return clienteOriginal;
      });
    });

    this.editCustomerService.notificarUpload.subscribe(cliente => {

      this.clientes = this.clientes.map(clienteOriginal => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.foto = cliente.foto;
        }
        console.log(clienteOriginal)
        return clienteOriginal;
      });
    });
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
    /*if (search != '') {
      this.customersService.getClientesAll().subscribe(clientes =>
        this.clientes = clientes
      )
    }
    else {
      this.customersService.getClientes(0).subscribe(response => {
        this.clientes = response.content as Cliente[]
        this.paginador = response;
      })
    }*/
    this.pages = 0;
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

}
