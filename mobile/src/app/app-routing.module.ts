import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/local/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)

  },
  {
    path: 'forgot',
    loadChildren: () => import('./auth/forgot/forgot.module').then(m => m.ForgotPageModule)
  },
  {
    path: 'setpassword',
    loadChildren: () => import('./auth/setpassword/setpassword.module').then(m => m.SetpasswordPageModule)
  },
  {
    path: 'setpicture',
    loadChildren: () => import('./auth/setpicture/setpicture.module').then(m => m.SetpicturePageModule)
  },
  {
    path: 'setaddress',
    loadChildren: () => import('./auth/setaddress/setaddress.module').then(m => m.SetaddressPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate : [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
