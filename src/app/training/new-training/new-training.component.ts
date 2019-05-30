import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import { TrainingService } from '../training/training.service';
import { Exercise } from '../training/exrcise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter <void>();
  availableTrainings: Exercise[] = [];
  constructor(private trainingService: TrainingService) {  }

  addTraining () {
    this.trainingStart.emit();
  }

  ngOnInit() {
    this.availableTrainings = this.trainingService.getExercises();
  }

}
