import { UserDetailsComponent } from './component/details-popups/user-details/user-details.component';
import { LocationDetailsComponent } from './component/details-popups/location-details/location-details.component';
import { CompanyDetailsComponent } from './component/details-popups/company-details/company-details.component';
import { ChainDetailsComponent } from './component/details-popups/chain-details/chain-details.component';
import { MaterialModuleModule } from './../../shared/material-module.module';
import { CurrencyDetailsComponent } from './component/details-popups/currency-details/currency-details.component';
import { CurrencyComponent } from './component/currency/currency.component';
import { DashboardRoutingModule } from './dashbord-routing.module';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SideNavigationComponent } from './component/side-navigation/side-navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashbordComponent } from './component/dashbord/dashbord.component';
import { CostCenterAccessComponent } from './component/cost-center-access/cost-center-access.component';
import { UserComponent } from './component/user/user.component';
import { LocationComponent } from './component/location/location.component';
import { ChainComponent } from './component/chain/chain.component';
import { CompanyComponent } from './component/company/company.component';
import { UsersAdminComponent } from './component/users-admin/users-admin.component';
import { CompanyAccessComponent } from './component/company-access/company-access.component';
import { ConnectingPathComponent } from './component/connecting-path/connecting-path.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './component/popups/add-user-popup/add-user.component';
import { AddChainPopupComponent } from './component/popups/add-chain-popup/add-chain-popup.component';
import { AddCompanyPopupComponent } from './component/popups/add-company-popup/add-company-popup.component';
import { AddCostCenterAccessComponent } from './component/popups/add-cost-center-access/add-cost-center-access.component';
import { AddLocationPopupComponent } from './component/popups/add-location-popup/add-location-popup.component';
import { AddCurrencyPopupComponent } from './component/popups/add-currency-popup/add-currency-popup.component';
import { CostCenterAccessDetailsComponent } from './component/details-popups/cost-center-access/cost-center-access.component';
import { DatePipe } from '@angular/common';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddNormalUserComponent } from './component/popups/add-normal-user/add-normal-user.component';
import { NormalUserComponent } from './component/details-popups/normal-user/normal-user.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { ContactUsViewComponent } from './component/details-popups/contact-us/contact-us.component';
import { RequstsComponent } from './component/requsts/requsts.component';
import { FaqComponent } from './component/faq/faq.component';
import { AddFaqComponent } from './component/popups/add-faq/add-faq.component';
import { FaqDetailsComponent } from './component/details-popups/faq-details/faq-details.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    DashboardRoutingModule,
    MaterialModuleModule,
    MalihuScrollbarModule.forRoot(),
    NgSelectModule
  ],
  declarations: [
    HomeComponent,
    DashbordComponent,
    SideNavigationComponent,
    CostCenterAccessComponent,
    UserComponent,
    LocationComponent,
    ChainComponent,
    CompanyComponent,
    UsersAdminComponent,
    CompanyAccessComponent,
    ConnectingPathComponent,
    AddUserComponent,
    AddChainPopupComponent,
    AddCompanyPopupComponent,
    AddCostCenterAccessComponent,
    AddLocationPopupComponent,
    AddCurrencyPopupComponent,
    CurrencyComponent,
    CurrencyDetailsComponent,
    ChainDetailsComponent,
    CompanyDetailsComponent,
    CostCenterAccessDetailsComponent,
    LocationDetailsComponent,
    UserDetailsComponent,
    AddNormalUserComponent,
    NormalUserComponent,
    ContactUsComponent,
    ContactUsViewComponent,
    RequstsComponent,
    FaqComponent,
    AddFaqComponent,
    FaqDetailsComponent
  ],
  providers: [
    DatePipe,
  ],
  exports: [DashboardRoutingModule],
})
export class DashbordModule { }
