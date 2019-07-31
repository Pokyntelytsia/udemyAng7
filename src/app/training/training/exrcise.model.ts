import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface Exercise {
    id: string,
    name: string,
    duration: number,
    calories: number,
    date?: Date|Timestamp<any>,
    state?: 'completed' | 'cancelled' | null
}