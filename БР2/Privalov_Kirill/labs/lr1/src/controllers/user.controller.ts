import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';

const userRepo = AppDataSource.getRepository(User);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     summary: Retrieve all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       default:
 *         description: Unexpected error.
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await userRepo.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     summary: Retrieve a user by ID
 *     description: Get a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       default:
 *         description: Unexpected error.
 */
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userRepo.findOneBy({ id });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     summary: Update a user's information
 *     description: Edit the user details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       default:
 *         description: Unexpected error.
 */
export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const { firstName, lastName, email } = req.body;

    const user = await userRepo.findOneBy({ id });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    const updatedUser = await userRepo.save(user);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     summary: Delete a user
 *     description: Delete a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the user to delete.
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       default:
 *         description: Unexpected error.
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userRepo.findOneBy({ id });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await userRepo.remove(user);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
