import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavVideosComponent } from './fav-videos/fav-videos.component';
import { FavVideosRoutingModule } from './fav-videos-routing.module'
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReltagsPipe } from '@shared/pipes/reltags.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
      FavVideosComponent,
      ReltagsPipe
    ],
    imports: [
        CommonModule,
        FavVideosRoutingModule,
        HttpClientModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
        FormsModule,
        NgbModule
    ]
})
export class FavVideosModule { }
