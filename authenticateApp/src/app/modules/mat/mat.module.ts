import {  NgModule } from '@angular/core';
import {  CommonModule } from '@angular/common';
import {  MatToolbarModule } from '@angular/material/toolbar';
import {  MatFormFieldModule  } from '@angular/material/form-field';
import {  MatInputModule  } from '@angular/material/input';
import {  MatIconModule } from '@angular/material/icon';
import {  MatButtonModule } from '@angular/material/button';

const MatModules = [
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule
]



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ...MatModules
  ],
  exports: [
    ...MatModules
  ]
})
export class MatModule { }
