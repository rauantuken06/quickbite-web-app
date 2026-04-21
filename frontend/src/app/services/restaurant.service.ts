import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Restaurant {
    id: number;
    name: string;
    cuisine: string;
    description: string;
    image: string;
    photos: string[];
    rating: number;
    deliveryTime: string;
}

interface ApiRestaurant {
    id: number;
    name: string;
    cuisine: string;
    description: string;
    image: string;
    photos: string[];
    rating: number;
    delivery_time: string;
}

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8000/api/restaurants/';

    getAll(): Observable<Restaurant[]> {
        return this.http.get<ApiRestaurant[]>(this.apiUrl).pipe(
            map((rows) =>
                rows.map((r) => ({
                    id: r.id,
                    name: r.name,
                    cuisine: this.toTitle(r.cuisine),
                    description: r.description,
                    image: r.image,
                    photos: r.photos || [],
                    rating: r.rating,
                    deliveryTime: r.delivery_time || ''
                }))
            )
        );
    }

    private toTitle(value: string): string {
        if (!value) return '';
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
}