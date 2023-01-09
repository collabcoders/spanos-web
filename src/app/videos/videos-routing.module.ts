import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from '../layout/main-layout/main-layout.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  {
    path: 'videos',
    component: MainLayoutComponent,
    children: [
      { path: '', component: VideosComponent }
    ]
  },
  {
    path: 'favorities',
    component: MainLayoutComponent,
    children: [
      { path: '', component: VideosComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }