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
import { CourseDetailsComponent } from './course-details/course-details.component';
import { WatchLessonComponent } from './watch-lesson/watch-lesson.component';
import { VideoPreviewComponent } from './course-details/video-preview/video-preview.component';
import { VideoPlayComponent } from './watch-lesson/video-play/video-play.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LearnMoreComponent } from './home/learn-more/learn-more.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import { MessagesComponent } from './messages/messages.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';

@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
    CoursesComponent,
    OverviewComponent,
    ProfileDetailsComponent,
    MissionComponent,
    NotFoundComponent,
    ContactsComponent,
    ExploreComponent,
    MyLessonsComponent,
    CourseDetailsComponent,
    WatchLessonComponent,
    VideoPreviewComponent,
    VideoPlayComponent,
    CreateCourseComponent,
    LearnMoreComponent,
    EditCourseComponent,
    DialogComponent,
    TakeQuizComponent,
    CreateQuizComponent,
    QuizResultsComponent,
    MessagesComponent,
    AdminCoursesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    {
      provide: LessonsService,
      useClass: LessonsService
    }
  ]
})
export class SharedModule { }
