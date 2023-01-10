import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos/videos.component';
import { VideosRoutingModule } from './videos-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TagsPipe } from '@shared/pipes/tags.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadImageModule,LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';

@NgModule({
    declarations: [
        VideosComponent,
        TagsPipe
    ],
    imports: [
        CommonModule,
        VideosRoutingModule,
        HttpClientModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
        FormsModule,
        NgbModule,
        LazyLoadImageModule
    ],
    providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }]
})
export class VideosModule { }
