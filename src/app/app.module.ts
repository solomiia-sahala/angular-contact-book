import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactCardComponent } from './сomponents/contact-card/contact-card.component';
import { ContactListComponent } from './сomponents/contact-list/contact-list.component';
import { ContactDetailsComponent } from './сomponents/contact-details/contact-details.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PageNotFoundComponent } from './сomponents/page-not-found/page-not-found.component';
import {MatButtonModule} from "@angular/material/button";
import {FilterPipe} from "./pipes/filter.pipe";
import { AddContactComponent } from './сomponents/add-contact/add-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactCardComponent,
    ContactListComponent,
    ContactDetailsComponent,
    PageNotFoundComponent,
    FilterPipe,
    AddContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
