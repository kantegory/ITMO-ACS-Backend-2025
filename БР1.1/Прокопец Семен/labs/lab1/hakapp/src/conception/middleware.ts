import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response, NextFunction} from "express";


@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(reg: Request, res: Response, next: NextFunction){
        next()
    }
}