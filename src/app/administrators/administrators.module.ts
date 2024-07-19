import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementModule } from './user-management/user-management.module';
import { GenCodeComponent } from './gen-code/gen-code.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { pathToFileURL } from 'url';
import { resultsManagementModule } from './results-managerment/results-managerment.module';
import { UserInfoManagementModule } from './user-infor/user-infor.module';
import { AnswerForTestManagementModule } from './answer-for-test/answer-for-test-management.module';


// routing
const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
  }, 
  
  {
    path: 'results',
    loadChildren: () => import('./results-managerment/results-managerment.module').then(m => m.resultsManagementModule)
  },
  {
    path: 'user-detail',
    loadChildren: () => import('./user-infor/user-infor.module').then(m => m.UserInfoManagementModule)
  },
  
  {
    path: 'user-answer',
    loadChildren: () => import('./answer-for-test/answer-for-test-management.module').then(m => m.AnswerForTestManagementModule)
  },
]

@NgModule({
  declarations: [
    GenCodeComponent,
  ],
  imports: [
    FormsModule,
    NgSelectModule,
    NgxDatatableModule,
    resultsManagementModule,
    AnswerForTestManagementModule,
    UserInfoManagementModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UserManagementModule,
    RouterModule.forChild(routes),
  ]
})
export class AdministratorsModule { }
