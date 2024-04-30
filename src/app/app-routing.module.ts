import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactListComponent} from "./сomponents/contact-list/contact-list.component";
import {ContactDetailsComponent} from "./сomponents/contact-details/contact-details.component";
import {PageNotFoundComponent} from "./сomponents/page-not-found/page-not-found.component";
import {AddContactComponent} from "./сomponents/add-contact/add-contact.component";

const routes: Routes = [
  {
    path: '',
    component: ContactListComponent,
  },
  {
    path: 'addContact',
    component: AddContactComponent
  },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
