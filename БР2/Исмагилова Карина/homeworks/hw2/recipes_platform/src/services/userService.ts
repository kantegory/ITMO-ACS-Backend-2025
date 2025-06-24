import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { User } from "../entities/User";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

const app = express();
app.use(express.json());


app.get("/users", async (req: Request, res: Response) => {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users);
});


app.get('/users/:id', async (req: Request, res: Response): Promise<void> => {
  const user: User | null = await AppDataSource.getRepository(User)
    .findOneBy({ user_id: Number(req.params.id) });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json(user);
});

app.get('/users/email/:email', async (req: Request, res: Response): Promise<void> => {
  const user: User | null = await AppDataSource.getRepository(User)
    .findOneBy({ email: req.params.email });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json(user);
});

app.post("/users", async (req: Request, res: Response) => {
    const repo = AppDataSource.getRepository(User);
    const newUser = repo.create(req.body);
    const result = await repo.save(newUser);
    res.status(201).json(result);
});

app.put("/users/:id", async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(User);
    const user: User | null = await repo.findOneBy({ user_id: Number(req.params.id) });

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    repo.merge(user, req.body);
    const result = await repo.save(user);
    res.json(result);
});

app.delete("/users/:id", async (req: Request, res: Response) => {
    const result = await AppDataSource.getRepository(User).delete({
        user_id: Number(req.params.id),
    });
    res.json(result);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
