import {
    ExpressErrorMiddlewareInterface,
    Middleware
} from 'routing-controllers'

@Middleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
    error(error: any, _req: any, res: any) {
        const status = error.httpCode || 500
        res.status(status).json({ message: error.message || 'Internal Server Error' })
    }
}   