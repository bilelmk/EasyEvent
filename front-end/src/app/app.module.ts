import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule , TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader' ;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient , HttpClientModule } from '@angular/common/http';
import { UsersAddComponent } from './users/users-add/users-add.component';
import { UsersAddFromcsvComponent } from './users/users-add-fromcsv/users-add-fromcsv.component';
import { UsersDeleteComponent } from './users/users-delete/users-delete.component';
import { UsersUpdateComponent } from './users/users-update/users-update.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GroupAddComponent } from './group/group-add/group-add.component';
import { GroupUpdateComponent } from './group/group-update/group-update.component';
import { GroupDeleteComponent } from './group/group-delete/group-delete.component';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRippleModule,
  MatSnackBarModule,
  MatTableModule,
} from '@angular/material';


export function createTranslateLoader(http : HttpClient){
  return new TranslateHttpLoader(http ,  'assets/i18n/' , '.json')
}

@NgModule({
  declarations: [
    AppComponent,
    UsersAddComponent,
    UsersAddFromcsvComponent,
    UsersDeleteComponent,
    UsersUpdateComponent,
    SpinnerComponent,
    GroupAddComponent,
    GroupUpdateComponent,
    GroupDeleteComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    NgxSpinnerModule
  ],
  providers: [],
  entryComponents : [
    UsersAddComponent,
    UsersAddFromcsvComponent,
    UsersDeleteComponent,
    UsersUpdateComponent,
    GroupAddComponent,
    GroupUpdateComponent,
    GroupDeleteComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule { }
