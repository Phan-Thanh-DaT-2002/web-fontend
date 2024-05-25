import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementModule } from './user-management/user-management.module';
import { GenCodeComponent } from './gen-code/gen-code.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { pathToFileURL } from 'url';


// routing
const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
  },
]

@NgModule({
  declarations: [
    GenCodeComponent
  ],
  imports: [
    FormsModule,
    NgSelectModule,
    NgxDatatableModule,
    CommonModule,
    UserManagementModule,
    RouterModule.forChild(routes),
  ]
})
export class AdministratorsModule { }
