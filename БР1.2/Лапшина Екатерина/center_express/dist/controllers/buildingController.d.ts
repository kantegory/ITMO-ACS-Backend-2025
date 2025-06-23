import { Request, Response } from "express";
export declare const getAllBuildings: (req: Request, res: Response) => Promise<void>;
export declare const getBuildingById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createBuilding: (req: Request, res: Response) => Promise<void>;
export declare const updateBuilding: (req: Request, res: Response) => Promise<void>;
export declare const deleteBuilding: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=buildingController.d.ts.map