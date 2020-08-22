import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router' ;
import { GroupComponent } from './group.component' ;
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import {
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatRippleModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';



const routes: Routes = [
  {
    path     : '',
    component : GroupComponent
  },
];

@NgModule({
  declarations: [
    GroupComponent ,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTooltipModule,
    MatRippleModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TranslateModule,
    MatInputModule
  ],
  entryComponents : [

  ]
})
export class GroupModule { }
