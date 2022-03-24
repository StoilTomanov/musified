import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HelloComponent } from './shared/hello/hello.component';
import { MissionComponent } from './shared/mission/mission.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CoursesComponent } from './shared/profile/courses/courses.component';
import { OverviewComponent } from './shared/profile/overview/overview.component';
import { ProfileDetailsComponent } from './shared/profile/profile-details/profile-details.component';
import { ProfileComponent } from './shared/profile/profile.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HelloComponent
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
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
