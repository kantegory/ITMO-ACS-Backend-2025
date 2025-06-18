import { Router } from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/CategoryController';

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', (req, res, next) => {
  getCategoryById(req, res).catch(next);
});
categoryRouter.post('/', createCategory);
categoryRouter.put('/:id', updateCategory);
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;