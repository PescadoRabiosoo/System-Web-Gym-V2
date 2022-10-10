import { Component, OnInit } from '@angular/core';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages-cliente',
  templateUrl: './pages-cliente.component.html',
  styles: [
  ]
})
export class PagesClienteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
