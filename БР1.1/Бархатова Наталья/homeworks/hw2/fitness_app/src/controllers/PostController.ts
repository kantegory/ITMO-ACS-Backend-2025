import { Request, Response } from "express";
import { AppDataSource } from "../AppDataSource";
import { Post } from "../models/Post";

const postRepo = AppDataSource.getRepository(Post);

export const createPost = async (req: Request, res: Response) => {
  try {
    const postData = req.body;
    const post = postRepo.create(postData);
    const savedPost = await postRepo.save(post);
    res.status(201).json(savedPost);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postRepo.find();
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<any> => {
  try {
    const post = await postRepo.findOne({ where: { id: req.params.id }, relations: ["user"] });
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error: any) {
      res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const post = await postRepo.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    postRepo.merge(post, req.body);
    const updatedPost = await postRepo.save(post);
    res.json(updatedPost);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await postRepo.delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
