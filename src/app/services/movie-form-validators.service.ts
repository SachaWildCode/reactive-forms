import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class MovieFormValidatorsService {
  constructor() {}
  isRequiredValidator(titleKey: string, idKey: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      let title = group.controls[titleKey].value;
      let id = group.controls[idKey].value;
      if (title !== '' || id !== '') {
        return null;
      } else {
        return { isRequired: true };
      }
    };
  }
  rangeDateValidator(minYear: number, maxYear: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value >= minYear && control.value <= maxYear) {
        return null;
      } else {
        return { min: { minimal: minYear, maximal: maxYear } };
      }
    };
  }
}
