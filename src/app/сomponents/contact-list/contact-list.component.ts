import {Component, OnInit} from '@angular/core';
import {ContactService} from "../../services/contact.service";
import {Router} from "@angular/router";
import {Contact} from "../../interfaces/contact.interface";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  allContacts: Contact[] = [];
  searchContact: string = '';

  constructor(public contactService: ContactService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.allContacts = this.contactService.getAllContacts();
  }

  addNewContact(): void {
    this.router.navigate(["addContact"]);

  }

  getContactId(contactId: string): void {
    this.router.navigate(["contact/" + contactId]);
  }
}
