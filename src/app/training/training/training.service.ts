import { Exercise } from "./exrcise.model";
import { Subject } from "rxjs";

export class TrainingService {
    exerciseChanged = new Subject<Exercise> ();
    private runningExercise: Exercise;
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 100, calories: 111 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 30, calories: 111 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 20, calories: 111 },
        { id: 'burpees', name: 'Burpees', duration: 10, calories: 111 },
    ];
    getExercises() {
        return this.availableExercises.slice();
    }

    exerciseStart(selectedId: string) {
        this.runningExercise = this.availableExercises.find(
            ex => ex.id === selectedId
        );
        this.exerciseChanged.next({...this.runningExercise})
    }
}