import { Request, Response } from "express";
export declare const getAllApartments: (req: Request, res: Response) => Promise<void>;
export declare const getApartmentById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createApartment: (req: Request, res: Response) => Promise<void>;
export declare const updateApartment: (req: Request, res: Response) => Promise<void>;
export declare const deleteApartment: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=apartmentController.d.ts.map