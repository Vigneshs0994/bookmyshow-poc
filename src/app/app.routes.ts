import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MovieComponent } from './movie/movie.component';
import { TheatreComponent } from './theatre/theatre.component';
import { SeatingComponent } from './seating/seating.component';
import { BookingComponent } from './booking/booking.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
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
        component: TheatreComponent,
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
