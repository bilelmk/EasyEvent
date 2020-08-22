import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgesGeneratorComponent } from './badges-generator.component';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ColorPickerModule } from 'ngx-color-picker';

import {
  MatTooltipModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatSliderModule,
  MatInputModule,
  MatFormFieldModule,
  MatTabsModule,
  MatSelectModule,
  MatOptionModule,
} from '@angular/material' ;

const routes: Routes = [
  {
    path     : '',
    component : BadgesGeneratorComponent
  },
];


@NgModule({
  declarations: [BadgesGeneratorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSelectModule,
    MatOptionModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxQRCodeModule,
    ColorPickerModule,
  ]
})
export class BadgesGeneratorModule { }
