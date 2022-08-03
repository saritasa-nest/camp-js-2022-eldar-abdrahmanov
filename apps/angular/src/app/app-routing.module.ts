import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HashLocationStrategy } from '@angular/common';

import { AnimeTableComponent } from './features/anime/components/anime-table/anime-table.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistrationComponent } from './features/auth/registration/registration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'anime',
    component: AnimeTableComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: HashLocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
