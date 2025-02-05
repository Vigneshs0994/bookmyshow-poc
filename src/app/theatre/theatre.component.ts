import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TheatreService } from '../services/theatre.service';
import { theatreData } from '../../type';
 
interface Seat {
  number: number;
  selected: boolean;
}


@Component({
  selector: 'app-theatre',
  imports: [CommonModule,RouterModule],
  templateUrl: './theatre.component.html',
  styleUrl: './theatre.component.scss'
})
export class TheatreComponent implements OnInit{

  theatre: theatreData | undefined;
  theatresList: any[] = [];
  days: string[] = []; // Array to store the formatted dates
  filmDate: any;
  filmData: any;
  filmname: any;
  isModalOpen: boolean = false; // Modal visibility control
  seats: Seat[] = [];
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Array of numbers 1 to 10
  seatNumber: number | null = null; // Initially, no number is selected
  time: any;
  theatreid!: number;

  constructor(private route: ActivatedRoute, private theatreService:TheatreService, private router: Router) {
    this.fetchData();
    this.fetchTheatreList();
    this.setDefaultSelectedDate(); 
  }
  ngOnInit(): void {
    this.generateNextDays();
  }

  fetchTheatreList(){

  this.theatreService.getFilms().subscribe(response => {
    this.theatresList = response;
    });

}

getFilmInfo(time: any,id: any): void {
     this.isModalOpen = true;  
     this.time = time.time; 
     this.seatNumber = 1;
     this.theatreid = id;
   }

  getFilmDate(date: string): void {
    this.filmDate = date; 
  }
 
  openModal() {
    this.isModalOpen = true;

  }

  // Function to close the modal
  closeModal() {
    this.isModalOpen = false;
  }
  
   // Function to select a number
   selectNumber(num: number): void {
    this.seatNumber = num; // Set the selected number
  }

  // Function to print the selected number
  printSelectedNumber(): void {
    if (this.seatNumber !== null && this.filmDate !== undefined) {
    //  alert(`You selected:${this.filmname} ${this.theatreid} DAte:${this.filmDate} -- time: ${this.time}--Seat num: ${this.seatNumber}`);
      this.router.navigate(['/seating'],{queryParams:{ theatreid: this.theatreid,filmname: this.filmname,filmdate: this.filmDate,filmtime:this.time,seat:this.seatNumber }});

    } else {
      alert('Please select a Date/seat number!');
    }
  }
  
  initializeSeats(): void {
    for (let i = 1; i <= 10; i++) {
      this.seats.push({ number: i, selected: false });
    }
  }

  toggleSeatSelection(seat: Seat): void {
    seat.selected = !seat.selected;
  }

  fetchData(): void {
    this.route.queryParams.subscribe(params => {
    const film = params['film'];
    if (film) {
      this.filmData = JSON.parse(decodeURIComponent(film));
       this.filmname =  this.filmData.name;
     }
    });
  }
 

   // Function to generate next 5 days
   generateNextDays() {
      const currentDate = new Date(); // Today's date
      for (let i = 0; i < 5; i++) {
        const nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + i); // Increment the date by i days
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
        this.days.push(nextDay.toLocaleDateString('en-US', options).toUpperCase()); // Format and push to array
      }    
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options).toUpperCase();
  }
  setDefaultSelectedDate() {
    const today = new Date();
    this.filmDate = this.formatDate(today); // Set today's date as default selected
  }


}
