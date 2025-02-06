import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TheatreService } from '../services/theatre.service';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectUsername } from '../state/useraccount/useraccount.selector';
import { getUsername } from '../state/useraccount/useraccount.actions';
import { MatInputModule } from '@angular/material/input';
import {
  FloatLabelType,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    AsyncPipe,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  //username: string = '';
  //password1: string = '';
  errorMessage: string = '';
  userAccountName$: Observable<string>;
  loginForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private theatreService: TheatreService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.userAccountName$ = this.store.select(selectUsername);
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Email field with validation
      password: ['', [Validators.required, Validators.minLength(3)]], // Password field with validation
    });
  }

  readonly hideRequiredControl = new FormControl(false);
  readonly floatLabelControl = new FormControl('auto' as FloatLabelType);
  readonly options = inject(FormBuilder).group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  protected readonly hideRequired = toSignal(
    this.hideRequiredControl.valueChanges
  );
  protected readonly floatLabel = toSignal(
    this.floatLabelControl.valueChanges.pipe(map((v) => v || 'auto')),
    { initialValue: 'auto' }
  );

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);

      this.theatreService
        .login(this.username?.value, this.password?.value)
        .subscribe({
          next: (response) => {
            this.authService.logout();
            // Save the JWT token to localStorage or sessionStorage
            localStorage.setItem('token', response.token);

            alert('Login successful!');

            this.authService.loadUserFromToken();
            const username = this.authService.getCurrentUser();
            this.store.dispatch(
              getUsername({ username: 'Account : ' + username + '' })
            );

            //  this.store.dispatch(getUsername());
            //  this.store.dispatch(getUsername({ username: this.username }));
            //this.store.dispatch(getUsername({ username: username1 ?? '' }));
            //this.store.dispatch(getUsername({ username: username as string }));
            //  this.userAccountName$ = this.store.select(selectUsername);
            //alert("username "+username)

            this.router.navigate(['/']);
          },
          error: (error) => {
            // Handle error (wrong credentials, server error, etc.)
            this.errorMessage = error;
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
