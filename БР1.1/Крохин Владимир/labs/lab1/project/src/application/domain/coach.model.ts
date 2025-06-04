import { AthleteModel } from "./athlete.model";
import { RoleModel } from "./role.model";
import { UserModel } from "./user.model";

export class CoachModel extends RoleModel {
    public id: number;
    public user: UserModel;
    private _athletes: AthleteModel[] = [];

    constructor(id: number, user: UserModel) {
        super(user);
        this.id = id;
        this.user = user;
    }

    addAthlete(athlete: AthleteModel): void {
        this.assignAthlete
        athlete.assignCoach?.(this);
    }

    removeAthlete(athlete: AthleteModel): void {
        this.unassignAthlete(athlete);
        athlete.unassignCoach?.(this);
    }

    assignAthlete(athlete: AthleteModel): void {
        if (this._athletes.indexOf(athlete) === -1) {
            this._athletes.push(athlete);
        }
    }

    unassignAthlete(athlete: AthleteModel): void {
        if (this._athletes.indexOf(athlete) === -1)
        {
            return;
        } 
        this._athletes = this._athletes.filter(a => a !== athlete);    }

    get athletes(): AthleteModel[] {
        return this._athletes;
    }
} 