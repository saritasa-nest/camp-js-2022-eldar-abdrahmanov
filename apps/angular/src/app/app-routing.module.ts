import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HashLocationStrategy } from '@angular/common';

import { AuthorizationGuard } from '../core/guards/authorization-guard.service';

import { AnimeTableComponent } from './features/anime/components/anime-table/anime-table.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistrationComponent } from './features/auth/registration/registration.component';
import { AnimeDetailsComponent } from './features/anime/components/anime-details/anime-details.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found/page-not-found.component';

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
    canActivate: [AuthorizationGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthorizationGuard, { provide: HashLocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
