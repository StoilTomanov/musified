import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ContactsComponent } from './shared/contacts/contacts.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { ExploreComponent } from './shared/explore/explore.component';
import { HomeComponent } from './shared/home/home.component';
import { MissionComponent } from './shared/mission/mission.component';
import { MyLessonsComponent } from './shared/my-lessons/my-lessons.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CoursesComponent } from './shared/profile/courses/courses.component';
import { OverviewComponent } from './shared/profile/overview/overview.component';
import { ProfileDetailsComponent } from './shared/profile/profile-details/profile-details.component';
import { ProfileComponent } from './shared/profile/profile.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
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
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'mylessons',
    pathMatch: 'full',
    component: MyLessonsComponent
  },
  {
    path: 'explore',
    pathMatch: 'full',
    component: ExploreComponent
  },
  {
    path: 'profile',
    pathMatch: 'full',
    redirectTo: 'profile/overview'
  },
  {
    path: 'profile',
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
