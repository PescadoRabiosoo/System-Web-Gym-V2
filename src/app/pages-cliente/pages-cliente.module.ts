import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesClienteComponent } from './pages-cliente.component';
import { EspacioComponent } from './espacio/espacio.component';



@NgModule({
  declarations: [
    PagesClienteComponent,
    EspacioComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesClienteModule { }
