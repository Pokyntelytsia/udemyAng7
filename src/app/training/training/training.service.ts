import { Exercise } from "./exrcise.model";
import { Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import {AngularFirestore} from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { UIService } from "src/app/shared/ui.service";

@Injectable()
export class TrainingService {
    availableExercises: Exercise[];
    exerciseChanged = new Subject<Exercise> ();
    exercisesChanged = new Subject<Exercise[]> ();
    pastExercisesChanged = new Subject<Exercise[]> ();
    constructor(
        private db: AngularFirestore,
        private uiService: UIService) {  }

    private runningExercise: Exercise;
    private fbSubs: Subscription[] = [];

    getExercises() {
        this.fbSubs.push(this.db.collection('availableExercises').snapshotChanges()
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
        }, error => {
            this.exercisesChanged.next(null);
            this.uiService.showNotification('Failed to load trainings list', null, 3000);
        }));
    }

    exerciseStart(selectedId: string) {
        this.runningExercise = this.availableExercises.find(
            ex => ex.id === selectedId
        );
        this.exerciseChanged.next({...this.runningExercise})
    }

    exerciseComplete() {
        this.savePastExercise({ 
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
         });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    exerciseCancele(progress: number) {
        this.savePastExercise({ 
            ...this.runningExercise,
            duration: this.runningExercise.duration * progress / 100,
            calories: this.runningExercise.duration * progress / 100,
            date: new Date(),
            state: 'cancelled'
         });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    private savePastExercise(exercise:Exercise) {
        this.db.collection('pastExercises').add(exercise);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    fetchFinishedExercises() {
        this.fbSubs.push(this.db.collection('pastExercises')
        .valueChanges()
        .pipe(
            map((data: any[]) => {
                return data.map(item => {
                    item.date = item.date.toDate();
                    return item;
                })
            })
        )
        .subscribe(
            (data: Exercise[]) => {
                this.pastExercisesChanged.next(data);
            }
        ));
    }

    cancelFbSubs() {
        while(this.fbSubs.length) {
            this.fbSubs.pop().unsubscribe();
        }
    }
}