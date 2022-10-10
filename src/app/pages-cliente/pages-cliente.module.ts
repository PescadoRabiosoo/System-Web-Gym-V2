import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesClienteComponent } from './pages-cliente.component';
import { EspacioComponent } from './espacio/espacio.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedClienteModule } from '../shared-cliente/shared-cliente.module';
import { AjustesComponent } from './espacio/ajustes/ajustes.component';
import { ProductosComponent } from './productos/productos.component';
import { MembresiasComponent } from './membresias/membresias.component';
import { PresencialesComponent } from './cursos/presenciales/presenciales.component';
import { VirtualesComponent } from './cursos/virtuales/virtuales.component';



@NgModule({
  declarations: [
    PagesClienteComponent,
    EspacioComponent,
    AjustesComponent,
    ProductosComponent,
    MembresiasComponent,
    PresencialesComponent,
    VirtualesComponent
  ],
  imports: [
    CommonModule,
    SharedClienteModule,
    AppRoutingModule,
  ]
})
export class PagesClienteModule { }
