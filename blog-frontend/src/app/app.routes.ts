import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostsComponent } from './posts/posts.component';
import { AuthGuard } from './auth.guard'; // Importiraj AuthGuard

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', component: PostsComponent}, 
  { path: '', redirectTo: '/posts', pathMatch: 'full' },  // Preusmjeravanje na postove ako je URL prazan
  { path: '**', redirectTo: '/posts' }  // Preusmjeravanje na postove za bilo koji nepoznati URL
];
