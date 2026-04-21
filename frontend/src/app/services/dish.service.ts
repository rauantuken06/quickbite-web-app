import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    cuisine: string;
    restaurantId: number;
    image: string;
}

interface ApiDish {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    cuisine: string;
    restaurant: number;
    images?: string[];
}

@Injectable({
    providedIn: 'root'
})
export class DishService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8000/api/dishes/';

    getAll(): Observable<Dish[]> {
        return this.http.get<ApiDish[]>(this.apiUrl).pipe(
            map((rows) =>
                rows.map((d) => ({
                    id: d.id,
                    name: d.name,
                    description: d.description,
                    price: d.price,
                    category: this.toTitle(d.category),
                    cuisine: this.toTitle(d.cuisine),
                    restaurantId: d.restaurant,
                    image: d.images && d.images.length ? d.images[0] : 'https://placehold.co/600x600?text=Dish'
                }))
            )
        );
    }

    getById(id: number): Observable<Dish | undefined> {
        return this.getAll().pipe(
            map((rows) => rows.find((x) => x.id === id))
        );
    }

    addDish(dish: Dish): Observable<unknown> {
        const payload = {
            name: dish.name,
            description: dish.description,
            price: dish.price,
            category: dish.category.toLowerCase(),
            cuisine: dish.cuisine.toLowerCase(),
            restaurant: dish.restaurantId,
            images: dish.image ? [dish.image] : [],
            is_available: true
        };
        return this.http.post(this.apiUrl, payload);
    }

    update(dish: Dish): Observable<unknown> {
        const payload = {
            name: dish.name,
            description: dish.description,
            price: dish.price,
            category: dish.category.toLowerCase(),
            cuisine: dish.cuisine.toLowerCase(),
            restaurant: dish.restaurantId,
            images: dish.image ? [dish.image] : [],
            is_available: true
        };
        return this.http.put(this.apiUrl + dish.id + '/', payload);
    }

    delete(id: number): Observable<unknown> {
        return this.http.delete(this.apiUrl + id + '/');
    }

    private toTitle(value: string): string {
        if (!value) return '';
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
}