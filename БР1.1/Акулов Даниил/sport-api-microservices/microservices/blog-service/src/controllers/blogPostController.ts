import {dataSource} from "../config/dataSource";
import {BlogPost} from "../models/BlogPost";
import {Request, Response} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {OpenAPI} from "routing-controllers-openapi";
import {Body, Delete, Get, JsonController, Post, Put, Req, Res} from "routing-controllers";
import {CreateBlogPostDto, UpdateBlogPostDto} from "../dto/blogPostDto";
import axios from "axios";
import {SETTINGS} from "../config/settings";

const blogPostRepo = dataSource.getRepository(BlogPost);

@JsonController('/blog-post')
export class BlogPostController {
    @OpenAPI({})
    @Get('/get-all')
    async getAll(
        @Res() res: Response,
    ) {
        const posts = await blogPostRepo.find();
        return res.json({posts});
    }

    @OpenAPI({})
    @Get('/get-one/:id')
    async getOne(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const post = await blogPostRepo.findOne({ where: { id: Number(id) } });
        if (!post) {
            throw ApiError.badRequest(errorMessages.postNotFound)
        }
        let user = null
        try{
            const response = await axios.get(
                `http://user-service:${SETTINGS.API_USER_PORT}/api/user/get-one/${post.authorId}`)
            user = response.data.user;
        } catch(error) {
            console.log("Axios error: ", error)
        }
        return res.json({post, user});
    }

    @OpenAPI({})
    @Post('/')
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: CreateBlogPostDto
    ) {
        const newPost = blogPostRepo.create(body);
        await blogPostRepo.save(newPost);
        return res.json({post: newPost});
    }

    @OpenAPI({})
    @Put('/:id')
    async update(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: UpdateBlogPostDto
    ) {
        const { id } = req.params;
        const post = await blogPostRepo.findOne({ where: { id: Number(id) } });
        if (!post) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        const updated = blogPostRepo.merge(post, body)
        await blogPostRepo.save(updated);
        return res.json({post: updated});
    }

    @OpenAPI({})
    @Delete('/:id')
    async delete(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const post = await blogPostRepo.findOne({ where: { id: Number(id) } });
        if (!post) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        await blogPostRepo.remove(post);
        return res.json({ message: 'Deleted successfully' });
    }
}

