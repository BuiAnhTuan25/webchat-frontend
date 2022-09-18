import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatgroupComponent } from './chatgroup/chatgroup.component';

const appRoutes:Routes=[
 {path:'login',component:LoginComponent},
 {path:'chat',component:ChatComponent},
 {path:'chatgroup',component:ChatgroupComponent},
 {path:'profile',component:ProfileComponent},
 {path:'register',component:RegisterComponent},
 {path: '', redirectTo: '/login', pathMatch: 'full' },
 {path:'**',component:PageNotFoundComponent}

];
@NgModule({
 declarations: [
 AppComponent,
 LoginComponent,
 ChatComponent,
 PageNotFoundComponent,
  RegisterComponent,
  ProfileComponent,
  ChatgroupComponent
 
 ],
 imports: [
 BrowserModule,
 RouterModule.forRoot(
 appRoutes,
 {enableTracing:true}
 ),
 HttpClientModule,
 ReactiveFormsModule,
 FormsModule,
 MatSliderModule,
 BrowserAnimationsModule
 ],
 bootstrap: [AppComponent]
}) 
export class AppModule { } 