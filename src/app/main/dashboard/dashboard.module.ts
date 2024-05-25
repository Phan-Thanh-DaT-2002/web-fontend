import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AuthGuard } from 'app/auth/helpers';
import { Role } from 'app/auth/models';

import { CoreCommonModule } from '@core/common.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';
import { InvoiceListService } from 'app/main/apps/invoice/invoice-list/invoice-list.service';
import { DashboardService } from 'app/main/dashboard/dashboard.service';
import { HomepageComponent } from './homepage/homepage.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TopTenScriptComponent } from './top-ten-script/top-ten-script.component';
import { TopTwentyQuestionsComponent } from './top-twenty-questions/top-twenty-questions.component';
import { TopTenCustomerComponent } from './top-ten-customer/top-ten-customer.component';
import { TopFiveLiveSessionComponent } from './top-five-live-session/top-five-live-session.component';
import { RatingComponent } from './rating/rating.component';
import { TopFourBotComponent } from './top-four-bot/top-four-bot.component';
import { ChanelInteractiveMonthlyComponent } from './chanel-interactive-monthly/chanel-interactive-monthly.component';

const routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [HomepageComponent, TopTenScriptComponent, TopTwentyQuestionsComponent, TopTenCustomerComponent, TopFiveLiveSessionComponent, RatingComponent, TopFourBotComponent, ChanelInteractiveMonthlyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgApexchartsModule,
    InvoiceModule,
    NgxDatatableModule,
    NgSelectModule
  ],
  providers: [DashboardService, InvoiceListService],
  exports: []
})
export class DashboardModule {}
