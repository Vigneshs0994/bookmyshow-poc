import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
}
