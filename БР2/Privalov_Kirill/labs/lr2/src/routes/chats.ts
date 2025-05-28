import {
  validatorCreateChat,
  validatorCreateMessage,
} from './../middleware/validator/validatorChat';
import { Router } from 'express';
import { checkJwt } from '../middleware/checkJwt';
import { ChatController } from '../controllers/ChatController';

const router = Router();

router.get('/:id', checkJwt, ChatController.getById);
router.post('/', checkJwt, validatorCreateChat, ChatController.create);
router.post(
  '/:id/message',
  checkJwt,
  validatorCreateMessage,
  ChatController.createMessage,
);

export default router;
