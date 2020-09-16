import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TestComponent } from './test/test.component';
import { PerformanceComponent } from './performance/performance.component';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {HighchartsChartModule} from "highcharts-angular";
import {MatButtonModule} from "@angular/material/button";



const appRoutes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'test', component: TestComponent },
  { path: '**', redirectTo: 'home' }
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    TestComponent,
    PerformanceComponent,
    HomeComponent,
    AuthDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HighchartsChartModule,
    MatButtonModule
  ],
  providers: [HeaderComponent],
  bootstrap: [AppComponent],
  entryComponents: [AuthDialogComponent]
})
export class AppModule { }
