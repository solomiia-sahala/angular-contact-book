import {Component, OnInit} from '@angular/core';
import {ContactService} from "../../services/contact.service";
import {ToastrService} from "ngx-toastr";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Contact} from "../../interfaces/contact.interface";
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {UuidService} from "../../services/uuid.service";
import {ActivatedRoute, Router} from "@angular/router";
import {getEmailErrorMessage, getInputErrorMessage, getTelErrorMessage, phoneValidator} from "../../services/utils";

@UntilDestroy()
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  formGroup!: FormGroup;
  contact!: Contact;

  readonly validationMessages = {
    getInputErrorMessage,
    getTelErrorMessage,
    getEmailErrorMessage
  }

  constructor(private contactService: ContactService,
              private toasterService: ToastrService,
              private uuidService: UuidService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');

    this.contact = this.contactService.getAllContacts().find(contact => contact.id === contactId)!;
    this.contact && this.createFormControls(this.contact);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const index = this.contactService.getAllContacts().findIndex(contact => contact.id === this.contact.id);
    this.contactService.contacts[index] = this.contact;
    this.contactService.saveToLocalStorage()

    this.toasterService.success(`Contact Updated Successfully.`)
    this.router.navigate([""]);
  }

  updateContactBtnEnable(): boolean {
    return this.formGroup.invalid;
  }

  returnToContacts(): void {
    this.router.navigate([""]);
  }

  private createFormControls(contact: Contact): void {
    this.formGroup = new FormGroup({
      firstName: new FormControl(contact.firstName, Validators.required),
      lastName: new FormControl(contact.lastName, Validators.required),
      telNum: new FormControl(contact.telNum, [Validators.required, phoneValidator]),
      email: new FormControl(contact.email, [Validators.required, Validators.email]),
    });

    this.formGroup.valueChanges.pipe(untilDestroyed(this)).subscribe(() => this.updateForm());
  }

  private updateForm(): void {
    const {firstName, lastName, telNum, email} = this.formGroup.value;

    this.contact = {
      id: this.contact.id,
      firstName,
      lastName,
      telNum,
      email
    }
  }
}
