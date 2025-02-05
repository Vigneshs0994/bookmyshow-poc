import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TheatreService } from '../services/theatre.service';

@Component({
  selector: 'app-seating',
  imports: [CommonModule, RouterModule],
  templateUrl: './seating.component.html',
  styleUrl: './seating.component.scss',
  providers: [DatePipe],
})
export class SeatingComponent implements OnInit {
  theatreData: any;

  //selectedSeat: string | null = null; // Stores the selected seat
  //unavailableSeats: string[] = [];//['B3']; // Example of unavailable seats
  film!: string;
  theatreid: number = 1;
  unavailableSeats: string[] = []; // Initialize with an empty array
  showtime!: string;
  filmdate!: string;
  totalSeats!: string;
  theatrename!: string;
  selectedSeats: string[] = [];

  constructor(
    private datePipe: DatePipe,
    private theatreService: TheatreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.fetchAllJson();

    this.fetchData();
    //this.fetchTheatreList();
    this.fetchTheatreDetailList();
  }
  ngOnInit(): void {
   }

  seatingGrid: string[][] = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10'],
  ];

  seatingGrid2: string[][] = [
    ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10'],
    ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10'],
  ];
  // Function to handle seat selection
  selectSeat(seat: string): void {
   /* if (!this.unavailableSeats.includes(seat)) {
      this.selectedSeat = this.selectedSeat === seat ? null : seat; // Toggle selection
      this.selectedSeats.add(seat);
    }*/
     // Check if the seat is already selected
    const seatIndex = this.selectedSeats.indexOf(seat);

    if (seatIndex > -1) {
      // Deselect the seat if it's already selected
      this.selectedSeats.splice(seatIndex, 1);
    } else {
      const totalseats = Number(this.totalSeats);
      // If not selected, add it to the selected seats list
      if (this.selectedSeats.length < totalseats) {
        this.selectedSeats.push(seat);
      }
    }
  }

  fetchTheatreList() {
    const id = Number(this.theatreid); // Convert to number
    this.theatreService.getTheatrename(id).subscribe((data) => {
      //alert(data+"   data.id");
      this.theatrename = data.name;
      this.theatreService
        .getSeatsByCinemaAndTime(data.id, this.showtime)
        .subscribe((seats) => {
          this.unavailableSeats = seats;
        });
    });
  }

  fetchTheatreDetailList() {
    const id = Number(this.theatreid); // Convert to number
    const inputDate = this.filmdate;
    this.filmdate = this.convertDate(inputDate);
    this.theatreService
      .getSeatsByFilmDetails(id, this.film, this.filmdate, this.showtime)
      .subscribe(
        (data) => {
          this.unavailableSeats = data.seats;

          console.log(data.seats); // Debugging: To see the fetched data
        },
        (error) => {
          console.error('Error fetching showtime data:', error);
        }
      );
  }
  fetchData() {
    this.route.queryParams.subscribe((params) => {
      this.film = params['filmname'];
      this.theatreid = params['theatreid'];
      this.showtime = params['filmtime'];
      this.filmdate = params['filmdate'];
      this.totalSeats = params['seat'];
      //   theatreid: this.theatreid,filmname: this.filmname,filmdate: this.filmDate,filmtime:this.time,seat:this.seatNumber }});
    });
  }

  convertDate(inputDate: string): string {
    // Convert the date to a valid format by adding the year
    const formattedDate = `${inputDate}, 2025`; // Add the year
    const dateObject = new Date(formattedDate);
    // Format the date to 'yyyy-MM-dd'
    return this.datePipe.transform(dateObject, 'yyyy-MM-dd')!;
  }

  isPayButtonEnabled(): boolean {
    return this.selectedSeats.length > 0;
  }

  onPayment() {
    this.selectedSeats.forEach((seat) => {
      this.unavailableSeats.push(seat);
    });
    //  this.fetchAllJson();
   // alert('Move to payment' + this.unavailableSeats+this.film);

    this.updateSeatsForShowtime(
      this.film,
      this.filmdate,
      this.showtime,
      this.unavailableSeats,
      this.theatreid
    );

    this.router.navigate(['/booking'], {
      queryParams: {
        filmName: this.film,
        date: this.filmdate,
        time: this.showtime,
        theatre: this.theatrename,
        seats: this.totalSeats,
        totalprice: Number(this.totalSeats) * 190,
        bookedSeat: this.unavailableSeats,
        selectedSeat: this.selectedSeats,
      },
    });
  }

  //get the complete json file
  fetchAllJson() {
    this.theatreService.getFilms().subscribe((response) => {
      this.theatreData = response;
     });
  }

  updateSeatsForShowtime(
    filmName: string,
     date: string,
    time: string,
    newSeats: string[],
    id: number
  ): void {
    // Find the film by film name  


    const cinema = this.theatreData.find((cinema: { id: number; }) => cinema.id === 1);
 
    const film = cinema.films.find((f: any) => f.filmName === filmName);
    if (film) {
 
      // Find the relevant showtime
      const showtime = film.showtimes.find((s: any) => s.date === date && s.time === time);
      if (showtime) {
        // Update the seats for the found showtime
        showtime.seats = this.unavailableSeats;
       }
 
   
    /*const theatre = this.theatreData.map((data: any[]) => {

      const cinema = data.map(c => c.id === id);

      if (cinema) {
       const film = cinema.name.find((f: any) => f.filmName === films); // Find the film by name
        if (film) {
          const showtime = film.showtimes.find(
            (s: any) => s.date === date && s.time === time
          ); // Find the showtime by date and time
          if (showtime) {
            newSeats.forEach((seat) => {
              if (!showtime.seats.includes(seat)) {
                showtime.seats.push(seat);
              }
            });

            // Update the backend with the modified data
            this.theatreService
              .updateTheatreData(this.theatreData)
              .subscribe((response) => {
                alert('--> 2 :' + response);

                console.log('Updated theatre data:', response);
              });
          } else {
            console.log('Showtime not found for the given date and time');
          }*/
        }
        this.theatreService.updateCinemaData(this.theatreData).subscribe((response: any) => {
          alert('Updated cinema data:'+response.films.seats);
        });

      // const showtime = film.showtimes.find((s: { date: string; time: string; }) => s.date === date && s.time === time);
  
    }
}
