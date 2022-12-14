import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { PaginatorCustomersComponent } from './customers/paginator/paginator-customers.component';
import { DetailCustomerComponent } from './customers/detail-customer/detail-customer.component';
import { PaginatorProductsComponent } from './products/paginator/paginator-products.component';
import { FiltroProductsPipe } from './products/pipes/filtro-products.pipe';
import { PaginatorTrainersComponent } from './trainers/paginator/paginator-trainers.component';
import { PaginatorMembershipsComponent } from './memberships/paginator/paginator-memberships.component';
import { AddMembershipComponent } from './memberships/add-membership/add-membership.component';
import { EditMembershipComponent } from './memberships/edit-membership/edit-membership.component';
import { FiltroMembershipsPipe } from './memberships/pipes/filtro-memberships.pipe';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { AddStockComponent } from './products/add-stock/add-stock.component';
import { ImgProductComponent } from './products/img-product/img-product.component';
import { NgxMaskModule } from 'ngx-mask';
import { PaginatorOnSiteComponent } from './courses/on-site/paginator/paginator-on-site.component';
import { FiltroOnSitePipe } from './courses/on-site/pipes/filtro-on-site.pipe';
import { AddOnSiteComponent } from './courses/on-site/add-on-site/add-on-site.component';
import { EditOnSiteComponent } from './courses/on-site/edit-on-site/edit-on-site.component';
import { ImgOnSiteComponent } from './courses/on-site/img-on-site/img-on-site.component';

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
    PaginatorCustomersComponent,
    DetailCustomerComponent,
    PaginatorProductsComponent,
    FiltroProductsPipe,
    PaginatorTrainersComponent,
    PaginatorMembershipsComponent,
    AddMembershipComponent,
    EditMembershipComponent,
    FiltroMembershipsPipe,
    AddProductComponent,
    EditProductComponent,
    AddStockComponent,
    ImgProductComponent,
    PaginatorOnSiteComponent,
    FiltroOnSitePipe,
    AddOnSiteComponent,
    EditOnSiteComponent,
    ImgOnSiteComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponentsModule,
    NgChartsModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
  ], providers: [
    DatePipe
  ]
})
export class PagesModule { }
