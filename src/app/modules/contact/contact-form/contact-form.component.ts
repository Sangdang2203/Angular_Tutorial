import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, Validators, NgForm, FormGroupDirective, ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
//import { ErrorStateMatcher } from "@angular/material/core";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { merge } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

export interface IFormGroup {
  name: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  services: FormControl<string>;
  message: FormControl<string>
}

@Component({
  standalone: true,
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  imports: [CommonModule, MatDatepickerModule, FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatIconModule, MatSelectModule],
})

export class ContactFormComponent {
  form: FormGroup<IFormGroup>;


  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required, Validators.pattern('/^\d{10}$/')]);

  services: FormControl<string>;
  serviceList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  errorMessage = '';

  constructor(private _formBuilder: FormBuilder) {
    this.form = this.createForm();
    const allControlChanges = merge(
      this.form.get("name").statusChanges,
      this.form.get("name").valueChanges,
      this.form.get("email").statusChanges,
      this.form.get("email").valueChanges,
      this.form.get("phone").statusChanges,
      this.form.get("phone").valueChanges,
    );

    allControlChanges.pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    switch (true) {
      case this.form.get("name").hasError('required'):
        this.errorMessage = 'Name is required.';
        break;
      case this.form.get("email").hasError('required'):
        this.errorMessage = 'Email is required.';
        break;
      case this.form.get("phone").hasError('required'):
        this.errorMessage = 'Phone number is required.';
        break;
      case this.form.get("email").hasError('email'):
        this.errorMessage = 'Email must have a correct format.';
        break;
      case this.form.get("phone").hasError('pattern'):
        this.errorMessage = 'Phone number must have 10 digits.';
        break;
      default:
        this.errorMessage;
        break;
    }
  }

  createForm(): FormGroup<IFormGroup> {
    return this._formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('/^\d{10}$/')]],
      email: ['', [Validators.required, Validators.email]],
      services: [''],
      message: ['']
    });
  }

}

