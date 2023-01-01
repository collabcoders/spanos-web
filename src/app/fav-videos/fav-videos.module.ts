import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavVideosComponent } from './fav-videos/fav-videos.component';
import { FavVideosRoutingModule } from './fav-videos-routing.module';
@NgModule({
  declarations: [
    FavVideosComponent
  ],
  imports: [
    CommonModule,
    FavVideosRoutingModule
  ]
})
export class FavVideosModule { }
