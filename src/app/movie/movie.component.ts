import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface Seat {
  number: number;
  selected: boolean;
}

@Component({
  selector: 'app-movie',
  imports: [RouterModule,CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})

export class MovieComponent implements OnInit{
  filmname!: String;
  languages!: String;
  imageUrl!: string;
  bgimageUrl!: string;
  storyline!: string;
  filmData!: any;
  isModalOpen: boolean = false; // Modal visibility control
  seats: Seat[] = [];
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Array of numbers 1 to 10
  selectedNumber: number | null = null; // Initially, no number is selected

  constructor(private route: ActivatedRoute,private router: Router) {
    this.fetchData();
   }
  ngOnInit(): void {
    this.initializeSeats();
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
        this.languages =  this.filmData.languages;
        this.imageUrl =  this.filmData.imageUrl;
        this.bgimageUrl =  this.filmData.bgImageurl;
        this.storyline =  this.filmData.storyline;
       }
      });
    }

    openModal() {
      this.isModalOpen = true;
    }
  
    // Function to close the modal
    closeModal() {
      this.isModalOpen = false;
    }
    
    onBookTicketClick() {
      //this.isModalOpen = true;
      const jsonString = encodeURIComponent(JSON.stringify(this.filmData));
    
      this.router.navigate(['/theatre'],{queryParams:{ film: jsonString }});
    }

   // Function to select a number
   selectNumber(num: number): void {
    this.selectedNumber = num; // Set the selected number
  }

  // Function to print the selected number
  printSelectedNumber(): void {
    if (this.selectedNumber !== null) {
      alert(`You selected: ${this.selectedNumber}`);
    } else {
      alert('Please select a number first!');
    }
  }
}
