import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { UsersComponent} from './users.component';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatPaginatorModule,
  MatRippleModule, MatSelectModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';

const routes: Routes = [
  {
    path     : '',
    component : UsersComponent
  },
];

@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatRippleModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSelectModule,
  ],
  entryComponents : [
  ],
})
export class UsersModule { }
