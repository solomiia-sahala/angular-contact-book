import { Injectable } from '@angular/core';
import {Contact} from "../interfaces/contact.interface";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [
    {
      id: '134fvd',
      firstName: 'Alice',
      lastName: 'Johnson',
      telNum: 1123456789,
      email: 'alice.johnson@example.com',
    },
    {
      id: '24444f5v4',
      firstName: 'Bob',
      lastName: 'Smith',
      telNum: 1123456789,
      email: 'bob.smith@example.com',
    },
    {
      id: '33434ff8445',
      firstName: 'Charlie',
      lastName: 'Brown',
      telNum: 1123456789,
      email: 'charlie.brown@example.com',
    },
    {
      id: '4e56ywe',
      firstName: 'David',
      lastName: 'Lee',
      telNum: 1123456789,
      email: 'david.lee@example.com',
    },
    {
      id: '54323gt5',
      firstName: 'Emma',
      lastName: 'Clark',
      telNum: 1123456789,
      email: 'emma.clark@example.com',
    },
    {
      id: '7edgj32',
      firstName: 'Fiona',
      lastName: 'Garcia',
      telNum: 1123456789,
      email: 'fiona.garcia@example.com',
    },
    {
      id: '98dks23',
      firstName: 'George',
      lastName: 'Harris',
      telNum: 1123456789,
      email: 'george.harris@example.com',
    }
  ];

  constructor() { }

  getAllContacts() {
    const contactsFromStorage = this.getFromLocalStorage();
    if (!!contactsFromStorage.length) {
      this.contacts = contactsFromStorage;
    } else {
      this.saveToLocalStorage();
    }
    return this.contacts
  }

  deleteContact(contact: Contact) {
    let index = this.contacts.indexOf(contact);
    this.contacts.splice(index, 1);
  }

  saveToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('contacts') || '[]');
  }
}
