import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared/shared.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
// SearchBarComponent será declarado no SharedModule

@NgModule({
  declarations: [AppComponent, NavbarComponent], // Remover SearchBarComponent daqui
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
