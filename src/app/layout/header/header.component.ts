import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { selectUsername } from '../../state/useraccount/useraccount.selector';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule,MatButtonModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent implements OnInit  {
  currentDateTime: string | undefined;
  isDropdownOpen = false;
  selectedCity = 'Choose Location';
  currentUser: String | null | undefined;
 showUsername: boolean = false; // Modal visibility control

 userAccountName$: Observable<string>;
 
 
  constructor(private store: Store<AppState>,private router: Router,private authService:AuthService) {
    this.userAccountName$ = this.store.select(selectUsername);

  }


  ngOnInit(): void {
  
    // alert("back login: "+this.currentUser);
    this.currentUser = this.authService.getCurrentUser();
    if(this.currentUser == null){
      this.currentUser = '';
      this.showUsername = false;
    }
    else{
      this.showUsername = true;
      this.currentUser = 'Account :'+this.currentUser;
    }
 // Get the current date and time in UTC
    const date = new Date();

    // Adjust the time to IST (UTC+5:30)
    const ISTOffset = 5.5 * 60; // IST is UTC +5:30, so 5.5 hours in minutes
    const localTime = new Date(date.getTime());

    // Format the date and time as "Day, Month Date, Year Hour:Minute:Second AM/PM"
    this.currentDateTime = localTime.toLocaleString('en-IN', {
      weekday: 'long',
    //  year: 'numeric',
      month: 'long',
      day: 'numeric',
   //   hour: '2-digit',
   //   minute: '2-digit',
   //   hour12: true // To display the time in 12-hour format with AM/PM
    });
  }

  onlogout(){
    this.authService.logout();
  }
  redirectToLogin() {
      // Navigate to the login route when the div is clicked
    this.router.navigate(['/login']); // Redirect to login page
  }

}
