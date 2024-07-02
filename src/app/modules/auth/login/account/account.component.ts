import { UserModel } from './../../../../shared/models/user.model';
import { Component, signal } from '@angular/core';
import { MESSAGE_TYPE } from '../../../../core/models/message.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from '../../../../shared/services/auth-api.service';
import { AuthService } from '../../auth.service';
import { GlobalService } from '../../../../core/services/global.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export interface IFormGroup {
  //email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './account.component.html',
  styleUrl: '../login.component.scss'
})
export class AccountComponent {
  //private users: UserModel[] = [];

  users = [
    {
      id: 1,
      name: "amy denonato",
      avatar: "https://images2.thanhnien.vn/528068263637045248/2024/6/1/4a51b369-61bb-44a3-8943-e69b4c7a1d1d-1717247991542752298657.jpeg",
      email: "amy_denonato@gmail.com",
      password: "12345678",
      token: "aaaaaaa"
    },
  ]

  user: {
    id: number;
    name: string;
    avatar: string;
    email: string;
    password: string;
    token: string
  }[] = this.users;

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    if (this.hide()) {
      this.hide.set(false);
    } else {
      this.hide.set(true);
    }
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

    // this._authApiService.getUsers().subscribe((users: UserModel[]) => {
    //   this.users = users;
    // });

  }

  createForm(): FormGroup<IFormGroup> {
    return this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }


  // login() {
  //   if (this.form.invalid) return;

  //   const data = this.form.getRawValue();
  //   this._authApiService.login(data).subscribe({
  //     next: (responseData: { accessToken: string }) => {
  //       this._authService.setLoggedIn(responseData);
  //       this._globalService.message.next({
  //         type: MESSAGE_TYPE.success,
  //         message: 'Login successfully!',
  //       });
  //       this._router.navigateByUrl(this.redirectUrl);
  //     },
  //     error: (err) => {
  //       this._globalService.message.next({
  //         type: MESSAGE_TYPE.error,
  //         message: 'Username or password incorrect!',
  //       });
  //     },
  //   });
  // }

  login() {
    if (this.form.invalid) return;

    const data = this.form.getRawValue();

    const matchUser = this.users.find((user) => user.id)

    if (matchUser && matchUser.password.toLowerCase() === data.password.toLowerCase()) {
      this._router.navigateByUrl("/dashboard");
      this._globalService.message.next({
        type: MESSAGE_TYPE.success,
        message: 'Login successfully!',
      });
    } else {
      // Failed to login
      this._router.navigateByUrl("/auth/account");
      this._globalService.message.next({
        type: MESSAGE_TYPE.error,
        message: 'Password incorrect!',
      });
    }
  }
}
