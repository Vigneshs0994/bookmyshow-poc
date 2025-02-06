import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { films } from '../constants';
import { AuthService } from '../services/auth.service';
import { TrendingComponent } from "./trending/trending.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  filmname!: string;
  languages!: string;
  films = films;  
  slides = [
    { img: 'assets/images/mufasa.png', alt: 'First Slide' },
    { img: 'assets/images/emergency.png', alt: 'Second Slide' },
    { img: 'assets/images/skyforce.png', alt: 'Third Slide' }
  ];

  constructor(private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
   }

  isModalOpen: boolean = false; // Modal visibility control

  openModal() {
    this.isModalOpen = true;
  }

  // Function to close the modal
  closeModal() {
    this.isModalOpen = false;
  }

  onFilmClick(film: any) {
    //this.isModalOpen = true;
    const jsonString = encodeURIComponent(JSON.stringify(film));
    this.router.navigate(['/movie'],{queryParams:{ film: jsonString } }
    ); 
    //this.filmname = film.name;
   // this.languages = film.languages;
   }
  
}
