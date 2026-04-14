import { Injectable } from "@angular/core";
import { dishes } from "../dev_data/dishes";
import { Dish } from "../dev_data/dishes";

@Injectable({
    providedIn: 'root'
})
export class DishService {
    private _dishes: Dish[] = [...dishes];

    getAll(): Dish[] {
        return this._dishes;
    }

    getById(id: number): Dish | undefined {
        return this._dishes.find(dish => dish.id === id);
    }

    getByCategory(category: string): Dish[] {
        return this._dishes.filter(dish => dish.category === category);
    }

    addDish(dish: Dish): void {
        this._dishes = [...this._dishes, dish];
    }

    update(updated: Dish): void {
        this._dishes = this._dishes.map(d => 
            d.id === updated.id ? updated : d
        );
    }

    delete(id: number): void {
        this._dishes = this._dishes.filter(d => d.id !== id);
    }
}