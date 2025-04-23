import {Router} from 'express';
import auth from './auth';
import users from './users';
import recipes from './recipes';
import comments from './comments';
import likes from './likes';
import subscriptions from './subscriptions';
import tags from './tags';

const router = Router();
router.use('/auth', auth);
router.use('/users', users);
router.use('/recipes', recipes);
router.use('/comments', comments);
router.use('/likes', likes);
router.use('/subscriptions', subscriptions);
router.use('/tags', tags);

export default router;
