import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { dishes } from "../dev_data/dishes";
import { Dish } from "../dev_data/dishes";
import { Observable, of } from 'rxjs';
import { catchError, map } from "rxjs/operators";

interface ApiDish {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    cuisine: string;
    restaurant: number;
    image: string;
}

@Injectable({
    providedIn: 'root'
})
export class DishService {
    private http = inject(HttpClient);

    private apiUrl = 'http://127.0.0.1:8000/api/dishes/';

    private _dishes: Dish[] = [...dishes];

    getAll(): Observable<Dish[]> {
        return this.http.get<ApiDish[]>(this.apiUrl).pipe(
            map((apiDishes) => 
                apiDishes.map((d) => ({
                    id: d.id,
                    name: d.name,
                    description: d.description,
                    price: d.price,
                    category: d.category,
                    cuisine: d.cuisine,
                    restaurantId: d.restaurant,
                    image: d.image
                }))
            ),
            catchError((err) => {
                console.error('API failed, fallback to dev_data', err);
                return of(this._dishes);
            })
        );
    }

    getById(id: number): Observable<Dish | undefined> {
        return this.getAll().pipe(
            map((dishes) => dishes.find(d => d.id === id))
        );
    }

    getByCategory(category: string): Observable<Dish[]> {
        return this.getAll().pipe(
            map((dishes) => dishes.filter(d => d.category === category))
        );
    }

    addDish(dish: Dish): Observable<any> {
        return this.http.post(this.apiUrl, dish);
    }

    update(updated: Dish): Observable<any> {
        return this.http.put(`${this.apiUrl}${updated.id}/`, updated);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}${id}/`);
    }
}