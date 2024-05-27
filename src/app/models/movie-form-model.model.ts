import { FormControl, FormGroup } from '@angular/forms';

export interface MovieFormModel {
  details: FormGroup<{
    id: FormControl<string>;
    title: FormControl<string>;
  }>;
  type: FormControl<string>;
  release: FormControl<number>;
  fiche: FormControl<string>;
}
