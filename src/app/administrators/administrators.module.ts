import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementModule } from './user-management/user-management.module';
import { GenCodeComponent } from './gen-code/gen-code.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { pathToFileURL } from 'url';
import { resultsManagementModule } from './results-managerment/results-managerment.module';


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
    CommonModule,
    UserManagementModule,
    RouterModule.forChild(routes),
  ]
})
export class AdministratorsModule { }
