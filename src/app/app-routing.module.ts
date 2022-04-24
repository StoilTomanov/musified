import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';
import { ContactsComponent } from './shared/contacts/contacts.component';
import { CourseDetailsComponent } from './shared/course-details/course-details.component';
import { CreateCourseComponent } from './shared/create-course/create-course.component';
import { EditCourseComponent } from './shared/edit-course/edit-course.component';
import { ExploreComponent } from './shared/explore/explore.component';
import { HomeComponent } from './shared/home/home.component';
import { LearnMoreComponent } from './shared/home/learn-more/learn-more.component';
import { MessagesComponent } from './shared/messages/messages.component';
import { MissionComponent } from './shared/mission/mission.component';
import { MyLessonsComponent } from './shared/my-lessons/my-lessons.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CoursesComponent } from './shared/profile/courses/courses.component';
import { OverviewComponent } from './shared/profile/overview/overview.component';
import { ProfileDetailsComponent } from './shared/profile/profile-details/profile-details.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { WatchLessonComponent } from './shared/watch-lesson/watch-lesson.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'learnmore',
    pathMatch: 'full',
    component: LearnMoreComponent
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent
  },
  {
    path: 'mission',
    pathMatch: 'full',
    component: MissionComponent
  },
  {
    path: 'mylessons',
    canActivate: [AuthGuard, AdminGuard],
    pathMatch: 'full',
    component: MyLessonsComponent
  },
  {
    path: 'watch/:id',
    canActivate: [AuthGuard, AdminGuard],
    pathMatch: 'full',
    component: WatchLessonComponent
  },
  {
    path: 'explore',
    canActivate: [AdminGuard],
    pathMatch: 'full',
    component: ExploreComponent
  },
  {
    path: 'create',
    pathMatch: 'full',
    canActivate: [AuthGuard, UserGuard],
    component: CreateCourseComponent
  },
  {
    path: 'messages',
    pathMatch: 'full',
    canActivate: [AuthGuard, UserGuard],
    component: MessagesComponent
  },
  {
    path: 'edit/:id',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: EditCourseComponent
  },
  {
    path: 'details/:id',
    pathMatch: 'full',
    component: CourseDetailsComponent
  },
  {
    path: 'profile',
    pathMatch: 'full',
    redirectTo: 'profile/overview'
  },
  {
    path: 'profile',
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard],
    component: ProfileComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent
      },
      {
        path: 'courses',
        component: CoursesComponent
      },
      {
        path: 'profile-details',
        component: ProfileDetailsComponent
      },
    ]
  },
  {
    path: 'contacts',
    pathMatch: 'full',
    canActivate: [AdminGuard],
    component: ContactsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
