import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Contact} from "../../interfaces/contact.interface";
import {ContactService} from "../../services/contact.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  @Input() contactInput!: Contact;
  @Output() onOpenContact: EventEmitter<string> = new EventEmitter()

  constructor(public contactService: ContactService, private toasterService: ToastrService) {
  }

  confirmDelete(event: Event, contact: Contact): void{
    event.stopImmediatePropagation()
    this.contactService.deleteContact(contact);
    this.contactService.saveToLocalStorage()
    this.toasterService.error(`Contact Deleted Successfully.`)
  }

  openContactDetails(contactId: string): void {
    this.onOpenContact.emit(contactId)
  }
}
