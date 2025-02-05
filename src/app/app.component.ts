import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./layout/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],  // Import RouterModule for routing
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
 })
export class AppComponent {
  title = 'show-time-app';
}
