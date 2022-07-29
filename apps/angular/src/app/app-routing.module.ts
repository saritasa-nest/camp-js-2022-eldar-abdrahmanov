import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeTableComponent } from './features/anime/components/anime-table/anime-table.component';

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
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
