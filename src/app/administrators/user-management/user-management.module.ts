import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { TestResultesUserComponent } from './test-resultes-user/test-resultes-user.component';
import { ResultesComponent } from '../call-for-test/resultes/resultes.component';
import { CallForTestComponent } from '../call-for-test/call-for-test.component';
import { CallForTest2Component } from '../call-for-test2/call-for-test2.component';
import { CallForTest3Component } from '../call-for-test3/call-for-test3.component';
import { MatSliderModule } from '@angular/material/slider';
import { ChoseForTestComponent } from '../chose-for-test/chose-for-test.component';
const routes: Routes = [
  {
    path: 'list-user',
    component: ListUserComponent,
  },

];

@NgModule({
  declarations: [
    ListUserComponent,
    AddUserComponent,
    DetailUserComponent,
    EditUserComponent,
    TestResultesUserComponent,
    CallForTestComponent,
    CallForTest2Component,
    CallForTest3Component,
    ResultesComponent,
    ChoseForTestComponent
  ],
  imports: [
    NgSelectModule,
    MatSliderModule,
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    NgbModule,
    ContentHeaderModule,
    TranslateModule
  ],
  exports: [
    DetailUserComponent
  ]
})
export class UserManagementModule { }
