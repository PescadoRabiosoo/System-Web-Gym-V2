import { Component, OnInit } from '@angular/core';
import { ConfiguracionesService } from '../services/configuraciones.service';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages-cliente',
  templateUrl: './pages-cliente.component.html',
  styles: [
  ]
})
export class PagesClienteComponent implements OnInit {

  constructor(private configuracionesService: ConfiguracionesService) { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
