import { CoachModel } from "./coach.model";
import { RoleModel } from "./role.model";
import { TrainingModel } from "./training.model";

export class AthleteModel extends RoleModel {
    private _coaches: CoachModel[] = [];
    private _trainings: TrainingModel[] = [];

    addCoach(coach: CoachModel): void {
        if (this._coaches.indexOf(coach) !== -1) {
            return;
        }
        this._coaches.push(coach);
        coach.assignAthlete(this);
    }

    removeCoach(coach: CoachModel): void {
        if (this._coaches.indexOf(coach) === -1) {
            return;
        }
        this._coaches = this._coaches.filter(c => c !== coach);
        coach.unassignAthlete(this);
    }

    assignTraining(training: TrainingModel): void {
        this._trainings.push(training);
    }

    removeTraining(training: TrainingModel): void {
        this._trainings = this._trainings.filter(t => t !== training);
    }

    assignCoach(coach: CoachModel): void {
        if (this._coaches.indexOf(coach) === -1) {
            this._coaches.push(coach);
        }
    }

    unassignCoach(coach: CoachModel): void {
        this._coaches = this._coaches.filter(c => c !== coach);
    }

    get trainings(): TrainingModel[] {
        return this._trainings;
    }

    get coaches(): CoachModel[] {
        return this._coaches;
    }
} 