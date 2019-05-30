import { Exercise } from "./exrcise.model";

export class TrainingService {
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 100, calories: 111 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 30, calories: 111 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 20, calories: 111 },
        { id: 'burpees', name: 'Burpees', duration: 10, calories: 111 },
    ];
    getExercises() {
        return this.availableExercises.slice();
    }
}