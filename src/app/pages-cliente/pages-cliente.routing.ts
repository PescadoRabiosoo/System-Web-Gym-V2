import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { RoleGuard } from "../guards/role.guard";
import { PresencialesComponent } from "./cursos/presenciales/presenciales.component";
import { VirtualesComponent } from "./cursos/virtuales/virtuales.component";
import { AjustesComponent } from "./espacio/ajustes/ajustes.component";
import { EspacioComponent } from "./espacio/espacio.component";
import { MembresiasComponent } from "./membresias/membresias.component";
import { PagesClienteComponent } from "./pages-cliente.component";
import { PasarelaPagoComponent } from "./pasarela-pago/pasarela-pago.component";
import { ProductosComponent } from "./productos/productos.component";

const routes: Routes = [
    {
        path: 'espacio',
        component: PagesClienteComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_USER' },
        children: [
            { path: '', component: EspacioComponent, data: { titulo: 'Mi Espacio' } },
            { path: 'ajustes', component: AjustesComponent, data: { titulo: 'Ajustes' } },
        ]
    },
    {
        path: 'productos',
        component: PagesClienteComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_USER' },
        children: [
            { path: '', component: ProductosComponent, data: { titulo: 'Productos' } },
        ]
    },
    {
        path: 'membresias',
        component: PagesClienteComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_USER' },
        children: [
            { path: '', component: MembresiasComponent, data: { titulo: 'Membresias' } },
        ]
    },
    {
        path: 'presenciales',
        component: PagesClienteComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_USER' },
        children: [
            { path: '', component: PresencialesComponent, data: { titulo: 'Cursos Presenciales' } },
        ]
    },
    {
        path: 'virtuales',
        component: PagesClienteComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_USER' },
        children: [
            { path: '', component: VirtualesComponent, data: { titulo: 'Cursos Virtuales' } },
        ]
    },
    {
        path: 'pago',
        component: PagesClienteComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_USER' },
        children: [
            { path: '', component: PasarelaPagoComponent, data: { titulo: 'Pasarella de Pago' } },
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesClienteRoutingModule { }
