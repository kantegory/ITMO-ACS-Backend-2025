import { JwtService } from "@nestjs/jwt";
export declare class JwtMiddleware {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    use(req: any, res: any, next: () => void): void;
}
