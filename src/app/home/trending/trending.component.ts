import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-trending',
  imports: [CommonModule],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss'
})
export class TrendingComponent {
  trendingMovies: string[] = [
    'Game Changer',
    'Interstellar',
    'Mufasa: The Lion King',
    'Emergency',
    'Sonic the Hedgehog 3',
    'FateH'
  ];


   // Declare a signal to store the selected movie
   selectedMovie = signal<string | null>(null);

   // Method to set the selected movie
   selectMovie(movie: string): void {
     this.selectedMovie.set(movie); // Update the signal with the selected movie
   }
}
