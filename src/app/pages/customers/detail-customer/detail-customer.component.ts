import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {

  cliente: Cliente;

  constructor(private activatedRoute: ActivatedRoute,
    private customersService: CustomersService) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.customersService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    });
  }

}
