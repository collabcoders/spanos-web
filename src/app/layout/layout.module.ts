import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent
  ],
  exports: [
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ]
})
export class LayoutModule { }
