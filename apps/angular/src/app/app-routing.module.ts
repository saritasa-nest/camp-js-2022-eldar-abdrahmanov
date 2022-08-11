import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HashLocationStrategy } from '@angular/common';

import { DetailsGuard } from '../core/guards/details.guard';

import { AnimeTableComponent } from './features/anime/components/anime-table/anime-table.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistrationComponent } from './features/auth/registration/registration.component';
import { AnimeDetailsComponent } from './features/anime/components/anime-details/anime-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'anime',
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
  {
    path: 'details/:id',
    component: AnimeDetailsComponent,
    canActivate: [DetailsGuard],
  },
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [DetailsGuard, { provide: HashLocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
