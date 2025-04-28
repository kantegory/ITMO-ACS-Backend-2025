"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogPostController_1 = require("../controllers/blogPostController");
const router = express_1.default.Router();
router.post('/posts', blogPostController_1.createPost);
router.get('/posts/:id', blogPostController_1.getPost);
router.put('/posts/:id', blogPostController_1.updatePost);
router.delete('/posts/:id', blogPostController_1.deletePost);
router.get('/posts', blogPostController_1.listPosts);
exports.default = router;
