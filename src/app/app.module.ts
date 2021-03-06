import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, FormControlDirective, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { HttpModule} from '@angular/http';
import { AccountService} from './services/account.service';
import { routing} from './app.routing';
import { UrlPermission} from './urlPermission/url.permission';
import { UserService} from './services/user.service';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent} from './components/navbar/navbar.component';
import { PageLandingComponent } from './components/page-landing/page-landing.component';
import { PageUserEditComponent } from './components/page-user-edit/page-user-edit.component';
import { ContainerComponent } from './components/container/container.component';
import { ContainerFooterComponent } from './components/container-footer/container-footer.component';
import { ContainerNavbarComponent } from './components/container-navbar/container-navbar.component';
import { ContainerSidebarComponent } from './components/container-sidebar/container-sidebar.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatAutocompleteModule, MatInputModule} from '@angular/material';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { PageCreneauComponent } from './components/page-creneau/page-creneau.component';
import { CreneauService } from './services/creneau.service';
import { RoomService } from './services/room.service';

import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { CalendarSlotComponent } from './components/calendar-slot/calendar-slot.component';
import { CalendarWeekendDayComponent } from './components/calendar-weekend-day/calendar-weekend-day.component';
import { UtilisateurDisponiblesPipe } from './pipes/utilisateur-disponibles.pipe';
import { ListeUtilisateurComponent } from './components/liste-utilisateur/liste-utilisateur.component';
import { EleveClassesPipe } from './pipes/eleve-classes.pipe';
import { NomDisponiblesPipe } from './pipes/nom-disponibles.pipe';
import { SalleComponent } from './components/salle/salle.component';
import { DuplicateWeekComponent } from './components/duplicate-week/duplicate-week.component';
import { NomAndClassesPipe } from './pipes/nom-classes-user.pipe';

import { ImportElevesComponent } from './components/import-eleves/import-eleves.component';
import { UploaderModule }      from 'angular-http-file-upload';
import { ImportProfesseursComponent } from './components/import-professeurs/import-professeurs.component';
import { ListeAppelComponent } from './components/liste-appel/liste-appel.component';
import { MatSelectModule } from '@angular/material/select';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfilUserComponent } from './components/profil-user/profil-user.component';

import { SDKBrowserModule } from './shared/sdk';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavbarComponent,
    PageLandingComponent,
    PageUserEditComponent,
    ContainerComponent,
    ContainerFooterComponent,
    ContainerNavbarComponent,
    ContainerSidebarComponent,
    DatepickerComponent,
    PageCreneauComponent,
    CalendarComponent,
    CalendarDayComponent,
    CalendarSlotComponent,
    CalendarWeekendDayComponent,
    UtilisateurDisponiblesPipe,
    ListeUtilisateurComponent,
    EleveClassesPipe,
    NomDisponiblesPipe,
    SalleComponent,
    DuplicateWeekComponent,
    ImportElevesComponent,
    ImportProfesseursComponent,
    NomAndClassesPipe,
    ListeAppelComponent,
    TimelineComponent,
    ProfilUserComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpModule,
      FormsModule,
      routing,
      HttpClientModule,
      MatListModule,
      MatIconModule,
      NgbModule.forRoot(),
      MatSlideToggleModule,
      MatAutocompleteModule,
      ReactiveFormsModule,
      MatInputModule,
      UploaderModule.forRoot(),
      SDKBrowserModule.forRoot(),
      MatSelectModule
  ],
  providers: [
      AuthService,
      AuthGuard,
      AccountService,
      UrlPermission,
      UserService,
      CreneauService,
      RoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
