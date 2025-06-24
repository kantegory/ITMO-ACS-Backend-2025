import { Router } from 'express';
import { BlogPostController } from '../controllers/blog-post.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const blogPostController = new BlogPostController();

/**
 * @openapi
 * /blogposts:
 *   get:
 *     tags: [BlogPosts]
 *     summary: Получить все статьи блога
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список статей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlogPost'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', authMiddleware, blogPostController.getAllBlogPosts);

/**
 * @openapi
 * /blogposts/{id}:
 *   get:
 *     tags: [BlogPosts]
 *     summary: Получить статью по ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID статьи
 *     responses:
 *       200:
 *         description: Данные статьи
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogPost'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Статья не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', authMiddleware, blogPostController.getBlogPostById);

/**
 * @openapi
 * /blogposts:
 *   post:
 *     tags: [BlogPosts]
 *     summary: Создать новую статью
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBlogPost'
 *     responses:
 *       201:
 *         description: Статья успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogPost'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка создания статьи
 */
router.post('/', authMiddleware, blogPostController.createBlogPost);

/**
 * @openapi
 * /blogposts/{id}:
 *   put:
 *     tags: [BlogPosts]
 *     summary: Обновить статью
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID статьи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBlogPost'
 *     responses:
 *       200:
 *         description: Обновленная статья
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogPost'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Статья не найдена
 *       500:
 *         description: Ошибка обновления
 */
router.put('/:id', authMiddleware, blogPostController.updateBlogPost);

/**
 * @openapi
 * /blogposts/{id}:
 *   delete:
 *     tags: [BlogPosts]
 *     summary: Удалить статью
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID статьи
 *     responses:
 *       204:
 *         description: Статья успешно удалена
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Статья не найдена
 *       500:
 *         description: Ошибка удаления
 */
router.delete('/:id', authMiddleware, blogPostController.deleteBlogPost);

export default router;