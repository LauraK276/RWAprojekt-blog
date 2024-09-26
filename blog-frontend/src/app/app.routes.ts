import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostsComponent } from './posts/posts.component';
import { AuthGuard } from './auth.guard'; // Importiraj AuthGuard
import { ProfileComponent } from './profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', component: PostsComponent}, 
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },  // Preusmjeravanje na postove ako je URL prazan
  { path: '**', redirectTo: '/posts' }  // Preusmjeravanje na postove za bilo koji nepoznati URL
];
