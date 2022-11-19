import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './user/account-settings/account-settings.component';
import { CustomersComponent } from './customers/customers.component';
import { MembershipsComponent } from './memberships/memberships.component';
import { ProductsComponent } from './products/products.component';
import { TrainersComponent } from './trainers/trainers.component';
import { OnSiteComponent } from './courses/on-site/on-site.component';
import { VirtualComponent } from './courses/virtual/virtual.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { DetailCustomerComponent } from './customers/detail-customer/detail-customer.component';

const routes: Routes = [
    {
        path: 'admin',
        component: PagesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_ADMIN' },
        children: [
            { path: '', component: ProfileComponent, data: { titulo: 'Perfil' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes' } },
        ]
    },
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_ADMIN' },
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
        ]
    },
    {
        path: 'customers',
        component: PagesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_ADMIN' },
        children: [
            { path: '', component: CustomersComponent, data: { titulo: 'Clientes' } },
            { path: 'page/:page', component: CustomersComponent, data: { titulo: 'Clientes' } },
            { path: 'detail/:id', component: DetailCustomerComponent, data: { titulo: 'Detalle de Cliente' } },
        ]
    },
    {
        path: 'memberships',
        component: PagesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_ADMIN' },
        children: [
            { path: '', component: MembershipsComponent, data: { titulo: 'Membresias' } },
            { path: 'page/:page', component: MembershipsComponent, data: { titulo: 'Membresias' } }
        ]
    },
    {
        path: 'products',
        component: PagesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_ADMIN' },
        children: [
            { path: '', component: ProductsComponent, data: { titulo: 'Productos' } },
            { path: 'page/:page', component: ProductsComponent, data: { titulo: 'Productos' } }
        ]
    },
    {
        path: 'trainers',
        component: PagesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_ADMIN' },
        children: [
            { path: '', component: TrainersComponent, data: { titulo: 'Entrenadores' } },
            { path: 'page/:page', component: TrainersComponent, data: { titulo: 'Entrenadores' } }
        ]
    },
    {
        path: 'courses',
        component: PagesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_ADMIN' },
        children: [
            {
                path: 'on-site', component: OnSiteComponent, data: { titulo: 'Presencial' }
            },
            { path: 'on-site/page/:page', component: OnSiteComponent, data: { titulo: 'Presencial' } },
            { path: 'virtual', component: VirtualComponent, data: { titulo: 'Virtual' } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
