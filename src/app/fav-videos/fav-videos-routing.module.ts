import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from '../layout/main-layout/main-layout.component';
import { FavVideosComponent } from './fav-videos/fav-videos.component';
const routes: Routes = [
  {
    path: 'favorities',
    component: MainLayoutComponent,
    children: [
      { path: '', component: FavVideosComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavVideosRoutingModule { }