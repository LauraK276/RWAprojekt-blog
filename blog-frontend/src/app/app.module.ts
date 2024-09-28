import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },
  { path: 'posts', loadComponent: () => import('./posts/posts.component').then(m => m.PostsComponent) },
  { path: 'edit-post/:id', loadComponent: () => import('./edit-post/edit-post.component').then(m => m.EditPostComponent) },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: '**', redirectTo: '/posts' }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule // Ostavite HttpClientModule ovdje
  ],
  providers: [],
  bootstrap: [] // Nema potrebe za dodavanjem komponenti ovdje
})
export class AppModule {}
