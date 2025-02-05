import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  film: any;
  theatrename: any;
  showtime: any;
  filmdate: any;
  totalSeats: any;
  totalprice: any;
  selectedSeats: string[] = [];
  showModal: boolean = false;
  customerName: string = ''; // Initially empty
  customerMobile: string = ''; // Initially empty
 
  constructor(private route: ActivatedRoute,private router: Router){
this.fetchData();
  }

  fetchData() {
    this.route.queryParams.subscribe((params) => {
      this.film = params['filmName'];
      this.theatrename = params['theatre'];
      this.showtime = params['time'];
      this.filmdate = params['date'];
      this.totalSeats = params['seats'];

      this.totalprice = params['totalprice'];
      this.selectedSeats = params['selectedSeat'];
 

      alert(" this.film "+ this.film+" - "+this.theatrename+" - "+this.showtime+" - "+this.filmdate+" - "+this.totalSeats)
     });
  }

  confirmBooking(): void {
    this.showModal = true;
  }

  // Close modal
  closeModal(): void {
    this.showModal = false;
  }
  cancelBooking(): void {
    this.router.navigate(['/']); // Navigate to the home page (assuming it's set to '/')
   }

}
