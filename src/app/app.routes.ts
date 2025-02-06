import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MovieComponent } from './movie/movie.component';
import { TheatreComponent } from './theatre/theatre.component';
import { SeatingComponent } from './seating/seating.component';
import { BookingComponent } from './booking/booking.component';
import { AuthenticateService } from './guards/authenticate.service';
import { TrendingComponent } from './home/trending/trending.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'trending', component: TrendingComponent }, // Child route
          ]
    },
    {
        path: 'login',
        component: LoginComponent,
       
    },

    { path: '', redirectTo: '/trending', pathMatch: 'full' },

 
    
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'movie',
        component: MovieComponent,
    },
    {
        path: 'theatre',
        component: TheatreComponent, canActivate: [AuthenticateService] 
    },
    {
        path: 'seating',
        component: SeatingComponent,
    },
    {
        path: 'booking',
        component: BookingComponent,
    },
  
    
];
