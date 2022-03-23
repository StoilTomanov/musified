import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloComponent } from './hello/hello.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { OverviewComponent } from './profile/overview/overview.component';
import { CoursesComponent } from './profile/courses/courses.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';



@NgModule({
  declarations: [
    HelloComponent,
    ProfileComponent,
    OverviewComponent,
    CoursesComponent,
    ProfileDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    HelloComponent,
    ProfileComponent,
    OverviewComponent,
    CoursesComponent,
    ProfileDetailsComponent
  ]
})
export class CoreModule { }
