import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

// only accepts numbers, white space, "+" and "-"
export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let phoneRegex: RegExp = new RegExp(/^[-+\s/0-9]*$/);
    const forbidden = !phoneRegex.test(control.value);
    return forbidden ? { invalidPhone: { value: control.value } } : null;
  };
}


export function getInputErrorMessage(): string {
  return 'You must enter a value';
}

export function getTelErrorMessage(): string {
  return 'You must enter only numbers, white space, "+" and "-"';
}

export function getEmailErrorMessage(): string {
  return 'You must enter valid email';
}
