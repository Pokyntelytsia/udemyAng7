import { Exercise } from "./exrcise.model";
import { Subscription } from "rxjs";
import { map, take } from "rxjs/operators";
import {AngularFirestore} from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { UIService } from "src/app/shared/ui.service";
import * as fromTraining from '../../store/training.reducer';
import * as Training from '../../store/training.actions';

@Injectable()
export class TrainingService {

    constructor(
        private store: Store<fromTraining.State>,
        private db: AngularFirestore,
        private uiService: UIService) {  }
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
            this.store.dispatch(new Training.SetAvailableExercises(data))
        }, error => {
            this.store.dispatch(new Training.SetAvailableExercises(null));
            this.uiService.showNotification('Failed to load trainings list', null, 3000);
        }));
    }

    exerciseStart(selectedId: string) {
        this.store.dispatch(new Training.SetActiveTraining(selectedId))
    }

    exerciseComplete() {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.savePastExercise({ 
                ...ex,
                date: new Date(),
                state: 'completed'
             });
            this.store.dispatch(new Training.StopTraining());
        });

    }

    exerciseCancele(progress: number) {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.savePastExercise({ 
                ...ex,
                duration: ex.duration * progress / 100,
                calories: ex.duration * progress / 100,
                date: new Date(),
                state: 'cancelled'
             });
             this.store.dispatch(new Training.StopTraining());
        })
        
    }

    private savePastExercise(exercise:Exercise) {
        this.db.collection('pastExercises').add(exercise);
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
                this.store.dispatch(new Training.SetFinishedExercises(data));
            }
        ));
    }

    cancelFbSubs() {
        while(this.fbSubs.length) {
            this.fbSubs.pop().unsubscribe();
        }
    }
}