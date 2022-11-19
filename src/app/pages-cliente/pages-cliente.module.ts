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
import { ReactiveFormsModule } from '@angular/forms';
import { ImgPerfilComponent } from './espacio/img-perfil/img-perfil.component';
import { VerCompraComponent } from './espacio/ver-compra/ver-compra.component';
import { VerCursoComponent } from './espacio/ver-curso/ver-curso.component';
import { PasarelaPagoComponent } from './pasarela-pago/pasarela-pago.component';
import { RegistroHorarioComponent } from './membresias/registro-horario/registro-horario.component';
import { NgxMaskModule } from 'ngx-mask';
import { FiltroMembresiasPipe } from './membresias/filtro-membresias.pipe';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';
import { FiltroProductosPipe } from './productos/filtro-productos.pipe';
import { FiltroPresencialesPipe } from './cursos/presenciales/filtro-presenciales.pipe';



@NgModule({
  declarations: [
    PagesClienteComponent,
    EspacioComponent,
    AjustesComponent,
    ProductosComponent,
    MembresiasComponent,
    PresencialesComponent,
    VirtualesComponent,
    ImgPerfilComponent,
    VerCompraComponent,
    VerCursoComponent,
    PasarelaPagoComponent,
    RegistroHorarioComponent,
    FiltroMembresiasPipe,
    CarritoComprasComponent,
    FiltroProductosPipe,
    FiltroPresencialesPipe
  ],
  imports: [
    CommonModule,
    SharedClienteModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    AjustesComponent
  ]
})
export class PagesClienteModule { }
