import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { AnswerComponent } from './answer/answer.component';
import { AnsChoseForTestComponent } from '../ans-chose-for-test/ans-chose-for-test.component';
import { Answer2Component } from './answer2/answer2.component';
import { Answer3Component } from './answer3/answer3.component';
const routes: Routes = [
  {
    path: 'Answer',
    component: AnswerComponent,
  },
  {
    path: 'Answer2',
    component: Answer2Component,
  },
  {
    path: 'Answer3',
    component: Answer3Component,
  },

  {
    path: 'AnsChoseForTest',
    component: AnsChoseForTestComponent,
  },

];

@NgModule({
  declarations: [
    AnswerComponent,
    Answer2Component,
    Answer3Component,
  ],
  imports: [
    NgSelectModule,
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CorePipesModule,
    CoreDirectivesModule,
    NgbModule,
    ContentHeaderModule,
    TranslateModule
  ],

})
export class AnswerForTestManagementModule { }
