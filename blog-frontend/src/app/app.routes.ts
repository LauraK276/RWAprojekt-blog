import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostsComponent } from './posts/posts.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: SinglePostComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' } // Default route
];
