import { Coach } from "./Coach";
import { Role } from "./Role";
import { Training } from "./Training";

export class Athlete extends Role {
    private _coaches: Coach[] = [];
    private _trainings: Training[] = [];

    addCoach(coach: Coach): void {
        if (this._coaches.includes(coach)) return;
        this._coaches.push(coach);
        coach.assignAthlete(this);
    }

    removeCoach(coach: Coach): void {
        if (!this._coaches.includes(coach)) return;
        this._coaches = this._coaches.filter(c => c !== coach);
        coach.unassignAthlete(this);
    }

    assignTraining(training: Training): void {
        this._trainings.push(training);
    }

    removeTraining(training: Training): void {
        this._trainings = this._trainings.filter(t => t !== training);
    }

    get trainings(): Training[] {
        return this._trainings;
    }

    get coaches(): Coach[] {
        return this._coaches;
    }
}