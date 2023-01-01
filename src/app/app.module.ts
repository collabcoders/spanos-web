import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SafePipe } from '@shared/pipes/safe.pipe';
import { InterceptorService } from '@shared/services/interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavVideosModule } from './fav-videos/fav-videos.module';
import { LayoutModule } from './layout/layout.module';
import { VideosModule } from './videos/videos.module';
import { VideoPlayerComponent } from './_shared/components/video-player/video-player.component';
import { TagsPipe } from './_shared/pipes/tags.pipe';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    VideosModule,
    FavVideosModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    DatePipe,
    SafePipe,
    TagsPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
