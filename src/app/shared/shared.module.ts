import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './profile/courses/courses.component';
import { OverviewComponent } from './profile/overview/overview.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { ProfileComponent } from './profile/profile.component';
import { MissionComponent } from './mission/mission.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ExploreComponent } from './explore/explore.component';
import { MyLessonsComponent } from './my-lessons/my-lessons.component';
import { HttpClientModule } from '@angular/common/http';
import { LessonsService } from './lessons.service';



@NgModule({
  declarations: [
    ProfileComponent,
    CoursesComponent,
    OverviewComponent,
    ProfileDetailsComponent,
    MissionComponent,
    NotFoundComponent,
    ContactsComponent,
    ExploreComponent,
    MyLessonsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: LessonsService,
      useClass: LessonsService
    }
  ]
})
export class SharedModule { }
