import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
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
import { FiltroCustomersPipe } from './customers/pipes/filtro-customers.pipe';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { ImgCustomerComponent } from './customers/img-customer/img-customer.component';
import { ImgProfileComponent } from './user/profile/img-profile/img-profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    CustomersComponent,
    MembershipsComponent,
    ProductsComponent,
    TrainersComponent,
    OnSiteComponent,
    VirtualComponent,
    ProfileComponent,
    FiltroCustomersPipe,
    AddCustomerComponent,
    EditCustomerComponent,
    ImgCustomerComponent,
    ImgProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponentsModule,
    NgChartsModule,
    ReactiveFormsModule,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
  ]
})
export class PagesModule { }
