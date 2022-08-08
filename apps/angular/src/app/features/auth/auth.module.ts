import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

import { RegistrationComponent } from './registration/registration.component';

import { LoginComponent } from './login/login.component';

/** */
@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    MatTabsModule,
  ],
  exports: [LoginComponent, RegistrationComponent],
})
export class AuthModule {}
