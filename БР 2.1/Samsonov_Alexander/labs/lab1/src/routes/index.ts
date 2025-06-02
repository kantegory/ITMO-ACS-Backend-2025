import { Router } from 'express';
import users from './users';
import tags from './tags';
import subscriptions from "./subscribtions";
import recipes from "./recipes";
import likes from "./likes";
import comments from "./comments";

const router = Router();
router.use(users);
router.use(tags)
router.use(subscriptions)
router.use(recipes)
router.use(likes)
router.use(comments)

export default router;
