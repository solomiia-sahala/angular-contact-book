import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ContactService} from "../../services/contact.service";
import {ToastrService} from "ngx-toastr";
import {UuidService} from "../../services/uuid.service";
import {Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {getEmailErrorMessage, getInputErrorMessage, getTelErrorMessage, phoneValidator} from "../../services/utils";
import {Contact} from "../../interfaces/contact.interface";

@UntilDestroy()
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  formGroup!: FormGroup;
  contact!: Contact;

  readonly validationMessages = {
    getInputErrorMessage,
    getTelErrorMessage,
    getEmailErrorMessage
  }

  constructor(public contactService: ContactService,
              private toasterService: ToastrService,
              private uuidService: UuidService,
              private router: Router) {}

  ngOnInit(): void {
    this.createFormControls();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.toasterService.success(`Contact Added Successfully.`)
    this.contactService.contacts.unshift(this.contact);
    this.contactService.saveToLocalStorage()
    this.router.navigate([""]);
  }

  addContactBtnEnable(): boolean{
    return this.formGroup.invalid;
  }

  returnToContacts(): void {
    this.router.navigate([""]);
  }

  private createFormControls(): void {
    this.formGroup = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      telNum: new FormControl(null, [Validators.required, phoneValidator]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });

    this.formGroup.valueChanges.pipe(untilDestroyed(this)).subscribe(() => this.updateForm());
  }

  private updateForm(): void {
    const { firstName, lastName, telNum, email} = this.formGroup.value;

    this.contact = {
      id: this.uuidService.getUuid(),
      firstName,
      lastName,
      telNum,
      email
    }
  }
}
