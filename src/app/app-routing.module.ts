import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: 'entry-list', component: MainPageComponent },
  { path: 'entry-details/:id', component: EntryDetailComponent },
  { path: 'entry-form', component: EntryFormComponent },
  { path: 'entry-form/:id', component: EntryFormComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/entry-list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
