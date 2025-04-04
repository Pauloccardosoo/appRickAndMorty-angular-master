import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared/shared.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
// SearchBarComponent será declarado no SharedModule

@NgModule({ declarations: [AppComponent, NavbarComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, AppRoutingModule, SharedModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
