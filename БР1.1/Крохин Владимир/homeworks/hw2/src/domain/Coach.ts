import { Athlete } from "./Athlete";
import { Role } from "./Role";


export class Coach extends Role {
    private _athletes: Athlete[] = [];

    addAthlete(athlete: Athlete): void {
        if (this._athletes.includes(athlete)) return;
        this._athletes.push(athlete);
        athlete.assignCoach(this);
    }

    removeAthlete(athlete: Athlete): void {
        if (!this._athletes.includes(athlete)) return;
        this._athletes = this._athletes.filter(a => a !== athlete);
        athlete.unassignCoach(this);
    }

    assignAthlete(athlete: Athlete): void {
        if (!this._athletes.includes(athlete)) {
            this._athletes.push(athlete);
        }
    }

    unassignAthlete(athlete: Athlete): void {
        this._athletes = this._athletes.filter(a => a !== athlete);
    }

    get athletes(): Athlete[] {
        return this._athletes;
    }
}