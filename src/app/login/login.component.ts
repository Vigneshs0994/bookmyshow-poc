import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
   templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  onLogin() {
    // Add logic to handle login (e.g., authenticate with backend)
    alert('Login form submitted');
  }
}
