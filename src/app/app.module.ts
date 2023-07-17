import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HeaderComponent } from './components/shared/header/header.component'
import { FooterComponent } from './components/shared/footer/footer.component'
import { LoginComponent } from './components/login/login.component'
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { HomeComponent } from './components/home/home.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MainComponent } from 'src/app/components/main/main/main.component'
import { DropzoneDirective } from 'src/app/directives/dropzone.directive'
import { UploadComponent } from 'src/app/components/main/upload/upload.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatDialogModule } from '@angular/material/dialog'
import { MatRadioModule } from '@angular/material/radio'
import {MatCardModule} from '@angular/material/card'
import {MatDividerModule} from '@angular/material/divider'
import { PopupComponent } from 'src/app/components/main/popup/popup.component'
import { TableComponent } from 'src/app/components/main//table/table.component'
import {FlexLayoutModule} from '@angular/flex-layout'
// import {ChartModule} from 'angular-highcharts'
import { HighchartsChartModule } from 'highcharts-angular';


//import firebase module
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { environment } from 'src/environments/environment'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { PERSISTENCE } from '@angular/fire/compat/auth'
import { CommonModule } from '@angular/common';
import { HighchartsComponent } from './components/main/highcharts/highcharts.component';
import { DistComponent } from './components/main/highcharts/dist/dist.component';
import { TryComponent } from './components/main/highcharts/try/try.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    MainComponent,
    UploadComponent,
    DropzoneDirective,
    PopupComponent,
    TableComponent,
    HighchartsComponent,
    DistComponent,
    TryComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
  
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    FontAwesomeModule,
    FlexLayoutModule,
    MatDividerModule,
    HighchartsChartModule 
  ],
  providers: [{ provide: PERSISTENCE, useValue: 'session' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
