import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthApiService } from '../../../shared/services/auth-api.service';
import { GlobalService } from '../../../core/services/global.service';
import { MESSAGE_TYPE } from '../../../core/models/message.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { MatIconModule } from '@angular/material/icon';

export interface IFormGroup {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  hidePassword = signal(true);
  clickEvent(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword);
    event.stopPropagation();
  }

  form: FormGroup<IFormGroup>;
  redirectUrl: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _authApiService: AuthApiService,
    private _authService: AuthService,
    private _globalService: GlobalService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.form = this.createForm();
    this.redirectUrl = this._route.snapshot.queryParams['redirectUrl'] || '/';
  }

  createForm(): FormGroup<IFormGroup> {
    return this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  login() {
    if (this.form.invalid) return;

    const data = this.form.getRawValue();
    this._authApiService.login(data).subscribe({
      next: (responseData: { email: string, password: string }) => {
        this._authService.setLoggedIn(responseData);
        this._globalService.message.next({
          type: MESSAGE_TYPE.success,
          message: 'Login successfully!',
        });
        this._router.navigateByUrl(this.redirectUrl);
      },
      error: (err) => {
        this._globalService.message.next({
          type: MESSAGE_TYPE.error,
          message: 'Email or password incorrect!',
        });
      },
    });
  }
}
