import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment'
import { NavbarComponent } from './navbar/navbar.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PersonalPageComponent } from './personal-page/personal-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EntryListComponent,
    EntryDetailComponent,
    PageNotFoundComponent,
    EntryFormComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AboutComponent,
    FooterComponent,
    MainPageComponent,
    PersonalPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
