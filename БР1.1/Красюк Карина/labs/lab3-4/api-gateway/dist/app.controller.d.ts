import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
export declare class AppController {
    private readonly httpService;
    private readonly services;
    constructor(httpService: HttpService);
    get(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    post(req: Request, res: Response, body: any): Promise<Response<any, Record<string, any>> | undefined>;
    private buildUrl;
    private proxyResponse;
    private handleError;
    private logRequest;
}
export declare class AppHealthController {
    check(): {
        status: string;
        timestamp: Date;
    };
}
