import Router from 'express';
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import blogPostRouter from "./blogPostRouter";
import exerciseTypeRouter from "./exerciseTypeRouter";
import sessionExerciseRouter from "./sessionExerciseRouter";
import workoutPlanRouter from "./workoutPlanRouter";
import workoutSessionRouter from "./workoutSessionRouter";

const router = Router();

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/blog-post', blogPostRouter)
router.use('/exercise-type', exerciseTypeRouter)
router.use('/session-exercise', sessionExerciseRouter)
router.use('/workout-plan', workoutPlanRouter)
router.use('/workout-session', workoutSessionRouter)

export {router}