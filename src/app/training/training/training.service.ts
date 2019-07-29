import { Exercise } from "./exrcise.model";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import {AngularFirestore} from '@angular/fire/firestore';
import { Injectable } from "@angular/core";

@Injectable()
export class TrainingService {
    availableExercises: Exercise[];
    exerciseChanged = new Subject<Exercise> ();
    exercisesChanged = new Subject<Exercise[]> ();
    constructor(private db: AngularFirestore) {  }

    private runningExercise: Exercise;
    private pastExersices = [];

    getExercises() {
        this.db.collection('availableExercises').snapshotChanges()
        .pipe(
            map(data => {
                return data.map(oneEx => {
                    return {
                        id: oneEx.payload.doc.id,
                        name: oneEx.payload.doc.data()['name'],
                        duration: oneEx.payload.doc.data()['duration'],
                        calories: oneEx.payload.doc.data()['calories'],
                    }
                })
            })
        )
        .subscribe(data => {
            this.availableExercises = data;
            this.exercisesChanged.next([...data]);
        });
    }

    exerciseStart(selectedId: string) {
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

    getFinishedExercises() {
        return [...this.pastExersices];
    }
}