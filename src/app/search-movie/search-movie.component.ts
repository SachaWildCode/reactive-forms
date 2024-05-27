import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Validators,
  ReactiveFormsModule,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import { MovieFormValidatorsService } from '../services/movie-form-validators.service';
import { MovieFormModel } from '../models/movie-form-model.model';

@Component({
  selector: 'app-search-movie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css',
})
export class SearchMovieComponent {
  constructor(
    private fb: NonNullableFormBuilder,
    private movieFormValidatorsService: MovieFormValidatorsService
  ) {}

  isSubmitted$ = false;
  movieForm: FormGroup<MovieFormModel> = this.fb.group({
    details: this.fb.group(
      {
        id: [''],
        title: [''],
      },
      {
        validators: this.movieFormValidatorsService.isRequiredValidator(
          'title',
          'id'
        ),
      }
    ),
    type: ['series'],
    release: this.fb.control(1900, [
      Validators.required,
      this.movieFormValidatorsService.rangeDateValidator(
        1900,
        new Date().getFullYear()
      ),
    ]),
    fiche: [''],
  });

  onSubmit() {
    this.isSubmitted$ = true;
    if (this.movieForm.valid) {
      console.log(JSON.stringify(this.movieForm.value));
      return;
    }
    console.log('Invalid Form');
  }

  ngOnInit(): void {
    this.movieForm.valueChanges.subscribe((values) => {
      console.log(values);
    });
    this.movieForm.get('fiche')?.patchValue('short');
  }
}
