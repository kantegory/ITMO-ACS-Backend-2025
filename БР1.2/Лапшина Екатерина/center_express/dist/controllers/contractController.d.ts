import { Request, Response } from "express";
export declare const getAllContracts: (req: Request, res: Response) => Promise<void>;
export declare const getContractById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createContract: (req: Request, res: Response) => Promise<void>;
export declare const updateContract: (req: Request, res: Response) => Promise<void>;
export declare const deleteContract: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=contractController.d.ts.map