import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderNavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatBadgeModule,
  ],
  exports: [
    FooterComponent,
    HeaderNavComponent,
  ],
  providers: []
})
export class CoreModule { }
