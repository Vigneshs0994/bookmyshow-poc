import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent implements OnInit {
  currentDateTime: string | undefined;
  isDropdownOpen = false;
  selectedCity = 'Choose Location';
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.isDropdownOpen = false; // Close the dropdown after selection
  }
  constructor(private router: Router) {}

  ngOnInit(): void {
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


  redirectToLogin() {
     // Navigate to the login route when the div is clicked
    this.router.navigate(['/login']); // Redirect to login page
  }

}
