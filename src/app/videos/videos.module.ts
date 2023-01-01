import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos/videos.component';
import { VideosRoutingModule } from './videos-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from '@shared/pipes/safe.pipe';
import { TagsPipe } from '@shared/pipes/tags.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        VideosComponent,
        SafePipe,
        TagsPipe
    ],
    imports: [
        CommonModule,
        VideosRoutingModule,
        HttpClientModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
        FormsModule
    ]
})
export class VideosModule { }
