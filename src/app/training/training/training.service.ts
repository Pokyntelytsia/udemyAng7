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
    private pastExersices = [];

    getExercises() {
        return this.availableExercises.slice();
    }

    exerciseStart(selectedId: string) {
        console.log('selectedId',selectedId);
        this.runningExercise = this.availableExercises.find(
            ex => ex.id === selectedId
        );
        this.exerciseChanged.next({...this.runningExercise})
    }

    exerciseComplete() {
        this.pastExersices.push({ 
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
         });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    exerciseCancele(progress: number) {
        this.pastExersices.push({ 
            ...this.runningExercise,
            duration: this.runningExercise.duration * progress / 100,
            calories: this.runningExercise.duration * progress / 100,
            date: new Date(),
            state: 'canceled'
         });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }
}