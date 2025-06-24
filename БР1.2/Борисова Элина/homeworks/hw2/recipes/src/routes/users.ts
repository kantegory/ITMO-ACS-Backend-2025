import { Router } from "express";
import { AppDataSource } from "../dataSource";
import { User } from "../entities/User";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = userRepository.create(req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        return res.send(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get user by id
router.get("/:id", async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: req.params.id },
            select: ["id", "username", "email", "created_at"]
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get user by email
router.get("/email/:email", async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { email: req.params.email },
            select: ["id", "username", "email", "created_at"]
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: req.params.id });
        if (!user) return res.status(404).json({ error: "User not found" });

        userRepository.merge(user, req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const results = await userRepository.delete(req.params.id);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;