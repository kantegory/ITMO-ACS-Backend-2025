import { Router, RequestHandler } from 'express';
import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { CrudController } from '../controllers/CrudController';

/**
 * Route definition interface
 */
export interface RouteDefinition {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    handler: RequestHandler;
    middleware?: RequestHandler[];
}

/**
 * Router factory class - similar to Django/DRF ViewSet
 */
export class RouterFactory<T extends ObjectLiteral> {
    private router: Router;
    private repository: Repository<T>;
    private controller: CrudController<T>;
    private routePrefix: string;

    constructor(
        dataSource: DataSource,
        entity: EntityTarget<T>,
        routePrefix: string,
        exposedFields: (keyof T)[] = []
    ) {
        this.router = Router();
        this.repository = dataSource.getRepository(entity);
        this.controller = new CrudController<T>(this.repository, exposedFields);
        this.routePrefix = routePrefix;

        // Default CRUD routes
        this.setupDefaultRoutes();
    }

    /**
     * Set up default CRUD routes
     */
    private setupDefaultRoutes(): void {
        this.router.get(`${this.routePrefix}`, this.controller.getAll);
        this.router.get(`${this.routePrefix}/:id`, this.controller.getOne as RequestHandler);
        this.router.post(`${this.routePrefix}`, this.controller.create);
        this.router.put(`${this.routePrefix}/:id`, this.controller.update as RequestHandler);
        this.router.delete(`${this.routePrefix}/:id`, this.controller.delete as RequestHandler);
    }

    /**
     * Add a custom route
     * @param route - Route definition
     */
    addRoute(route: RouteDefinition): RouterFactory<T> {
        const { path, method, handler, middleware = [] } = route;
        const fullPath = path.startsWith('/') ? path : `${this.routePrefix}${path}`;
        
        if (middleware.length > 0) {
            this.router[method](fullPath, ...middleware, handler);
        } else {
            this.router[method](fullPath, handler);
        }
        
        return this;
    }

    /**
     * Add multiple custom routes
     * @param routes - Array of route definitions
     */
    addRoutes(routes: RouteDefinition[]): RouterFactory<T> {
        routes.forEach(route => this.addRoute(route));
        return this;
    }

    /**
     * Get the router
     */
    getRouter(): Router {
        return this.router;
    }

    /**
     * Get the controller
     */
    getController(): CrudController<T> {
        return this.controller;
    }

    /**
     * Set a custom controller
     * @param controller - Custom controller
     */
    setController<C extends CrudController<T>>(controller: C): RouterFactory<T> {
        this.controller = controller;
        return this;
    }
}

/**
 * Create a router factory
 * @param dataSource - TypeORM data source
 * @param entity - Entity class
 * @param routePrefix - Route prefix
 * @param exposedFields - Fields to expose in responses
 */
export function createRouterFactory<T extends ObjectLiteral>(
    dataSource: DataSource,
    entity: EntityTarget<T>,
    routePrefix: string,
    exposedFields: (keyof T)[] = []
): RouterFactory<T> {
    return new RouterFactory<T>(dataSource, entity, routePrefix, exposedFields);
}