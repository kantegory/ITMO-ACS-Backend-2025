import { Router } from 'express';
import { CrudController } from '../controllers/CrudController';
import {DataSource, EntityTarget, ObjectLiteral} from 'typeorm';
import { RequestHandler } from 'express';


export function createCrudRouter<T extends ObjectLiteral>(
    dataSource: DataSource,
    entity: EntityTarget<T>,
    routePrefix: string,
    exposedFields: (keyof T)[] = []
): Router {
    const router = Router();
    const repository = dataSource.getRepository(entity);
    const controller = new CrudController<T>(repository, exposedFields);

    router.get(`${routePrefix}`, controller.getAll);
    router.get(`${routePrefix}/:id`, controller.getOne as RequestHandler);
    router.post(`${routePrefix}`, controller.create);
    router.put(`${routePrefix}/:id`, controller.update as RequestHandler);
    router.delete(`${routePrefix}/:id`, controller.delete as RequestHandler);

    return router;
}
