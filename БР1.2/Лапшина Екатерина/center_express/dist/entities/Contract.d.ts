import { User } from "./User";
import { Apartment } from "./Apartment";
export declare enum ContractStatus {
    PENDING = "v",
    ACTIVE = "l",
    FINISHED = "f"
}
export declare class Contract {
    ContractID: number;
    AgentID: User;
    ClientID: User;
    ApartmentID: Apartment;
    Status: ContractStatus;
    startDate: Date;
    endDate: Date;
    constructor();
}
//# sourceMappingURL=Contract.d.ts.map