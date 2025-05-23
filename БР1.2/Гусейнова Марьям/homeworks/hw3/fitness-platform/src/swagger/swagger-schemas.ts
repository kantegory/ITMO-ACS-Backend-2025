/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *           nullable: true
 *         email:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [мужчина, женщина]
 *         birth_date:
 *           type: string
 *           format: date
 *       required:
 *         - user_id
 *         - firstName
 *         - email

 *     RegisterUser:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *           nullable: true
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [мужчина, женщина]
 *         birth_date:
 *           type: string
 *           format: date
 *       required:
 *         - firstName
 *         - email
 *         - password

 *     LoginUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password

 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'

 *     UpdateUser:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *           nullable: true
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [мужчина, женщина]
 *         birth_date:
 *           type: string
 *           format: date
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     BlogPost:
 *       type: object
 *       properties:
 *         post_id:
 *           type: integer
 *         author:
 *           type: string
 *         title:
 *           type: string
 *         theme:
 *           type: string
 *           enum: [фитнес, здоровье, питание]
 *         content:
 *           type: string
 *         publication_date:
 *           type: string
 *           format: date
 *       required:
 *         - post_id
 *         - author
 *         - title
 *         - theme
 *         - content
 *         - publication_date

 *     CreateBlogPost:
 *       type: object
 *       properties:
 *         author:
 *           type: string
 *         title:
 *           type: string
 *         theme:
 *           type: string
 *           enum: [фитнес, здоровье, питание]
 *         content:
 *           type: string
 *       required:
 *         - author
 *         - title
 *         - theme
 *         - content

 *     UpdateBlogPost:
 *       type: object
 *       properties:
 *         author:
 *           type: string
 *         title:
 *           type: string
 *         theme:
 *           type: string
 *           enum: [фитнес, здоровье, питание]
 *         content:
 *           type: string
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         workout_id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         level:
 *           type: string
 *           enum: [начальный, средний, продвинутый]
 *         type:
 *           type: string
 *           enum: [кардио, силовая, йога]
 *         duration:
 *           type: integer
 *         video_url:
 *           type: string
 *           nullable: true
 *         guide:
 *           type: string
 *           nullable: true
 *       required:
 *         - workout_id
 *         - name
 *         - description
 *         - level
 *         - type
 *         - duration

 *     CreateWorkout:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         level:
 *           type: string
 *           enum: [начальный, средний, продвинутый]
 *         type:
 *           type: string
 *           enum: [кардио, силовая, йога]
 *         duration:
 *           type: integer
 *         video_url:
 *           type: string
 *           nullable: true
 *         guide:
 *           type: string
 *           nullable: true
 *       required:
 *         - name
 *         - description
 *         - level
 *         - type
 *         - duration

 *     UpdateWorkout:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         level:
 *           type: string
 *           enum: [начальный, средний, продвинутый]
 *         type:
 *           type: string
 *           enum: [кардио, силовая, йога]
 *         duration:
 *           type: integer
 *         video_url:
 *           type: string
 *           nullable: true
 *         guide:
 *           type: string
 *           nullable: true
 */

/**
 * @openapi
 * components:
 *   parameters:
 *     levelFilter:
 *       in: query
 *       name: level
 *       schema:
 *         type: string
 *         enum: [начальный, средний, продвинутый]
 *       description: Фильтр по уровню сложности
 *     
 *     typeFilter:
 *       in: query
 *       name: type
 *       schema:
 *         type: string
 *         enum: [кардио, силовая, йога]
 *       description: Фильтр по типу тренировки
 *     
 *     durationMinFilter:
 *       in: query
 *       name: durationMin
 *       schema:
 *         type: integer
 *       description: Минимальная продолжительность (в минутах)
 *     
 *     durationMaxFilter:
 *       in: query
 *       name: durationMax
 *       schema:
 *         type: integer
 *       description: Максимальная продолжительность (в минутах)
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CurrentProgress:
 *       type: object
 *       properties:
 *         progress_id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         current_weight:
 *           type: number
 *           format: float
 *           nullable: true
 *         current_height:
 *           type: number
 *           format: float
 *           nullable: true
 *         goal:
 *           type: string
 *           nullable: true
 *         activity_level:
 *           type: string
 *           enum: [начальный, средний, продвинутый]
 *           nullable: true
 *         update_date:
 *           type: string
 *           format: date
 *       required:
 *         - progress_id
 *         - user_id
 *         - update_date

 *     CreateCurrentProgress:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *         current_weight:
 *           type: number
 *           format: float
 *           nullable: true
 *         current_height:
 *           type: number
 *           format: float
 *           nullable: true
 *         goal:
 *           type: string
 *           nullable: true
 *         activity_level:
 *           type: string
 *           enum: [начальный, средний, продвинутый]
 *           nullable: true
 *       required:
 *         - user_id

 *     UpdateCurrentProgress:
 *       type: object
 *       properties:
 *         current_weight:
 *           type: number
 *           format: float
 *           nullable: true
 *         current_height:
 *           type: number
 *           format: float
 *           nullable: true
 *         goal:
 *           type: string
 *           nullable: true
 *         activity_level:
 *           type: string
 *           enum: [начальный, средний, продвинутый]
 *           nullable: true
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     WorkoutPlan:
 *       type: object
 *       properties:
 *         plan_id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *           nullable: true
 *         plan_goal:
 *           type: string
 *           nullable: true
 *         creation_date:
 *           type: string
 *           format: date
 *       required:
 *         - plan_id
 *         - user_id
 *         - name
 *         - creation_date

 *     CreateWorkoutPlan:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *           nullable: true
 *         plan_goal:
 *           type: string
 *           nullable: true
 *       required:
 *         - user_id
 *         - name

 *     UpdateWorkoutPlan:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *           nullable: true
 *         plan_goal:
 *           type: string
 *           nullable: true
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     PlanProgress:
 *       type: object
 *       properties:
 *         plan_progress_id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         plan_id:
 *           type: integer
 *         plan_date:
 *           type: string
 *           format: date
 *         duration:
 *           type: integer
 *         notes:
 *           type: string
 *           nullable: true
 *       required:
 *         - plan_progress_id
 *         - user_id
 *         - plan_id
 *         - plan_date
 *         - duration

 *     CreatePlanProgress:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *         plan_id:
 *           type: integer
 *         plan_date:
 *           type: string
 *           format: date
 *         duration:
 *           type: integer
 *         notes:
 *           type: string
 *           nullable: true
 *       required:
 *         - user_id
 *         - plan_id
 *         - plan_date
 *         - duration

 *     UpdatePlanProgress:
 *       type: object
 *       properties:
 *         plan_date:
 *           type: string
 *           format: date
 *         duration:
 *           type: integer
 *         notes:
 *           type: string
 *           nullable: true
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     WorkoutInPlan:
 *       type: object
 *       properties:
 *         workout_in_plan_id:
 *           type: integer
 *         plan_id:
 *           type: integer
 *         workout_id:
 *           type: integer
 *         ordinal_number:
 *           type: integer
 *       required:
 *         - workout_in_plan_id
 *         - plan_id
 *         - workout_id
 *         - ordinal_number

 *     CreateWorkoutInPlan:
 *       type: object
 *       properties:
 *         plan_id:
 *           type: integer
 *         workout_id:
 *           type: integer
 *         ordinal_number:
 *           type: integer
 *       required:
 *         - plan_id
 *         - workout_id
 *         - ordinal_number

 *     UpdateWorkoutInPlan:
 *       type: object
 *       properties:
 *         ordinal_number:
 *           type: integer
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       properties:
 *         exercise_id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         muscle_group:
 *           type: string
 *           enum: [ноги, руки, плечи, пресс, грудь]
 *         equipment:
 *           type: string
 *           nullable: true
 *         video_url:
 *           type: string
 *           nullable: true
 *       required:
 *         - exercise_id
 *         - name
 *         - description
 *         - muscle_group

 *     CreateExercise:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         muscle_group:
 *           type: string
 *           enum: [ноги, руки, плечи, пресс, грудь]
 *         equipment:
 *           type: string
 *           nullable: true
 *         video_url:
 *           type: string
 *           nullable: true
 *       required:
 *         - name
 *         - description
 *         - muscle_group

 *     UpdateExercise:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         muscle_group:
 *           type: string
 *           enum: [ноги, руки, плечи, пресс, грудь]
 *         equipment:
 *           type: string
 *           nullable: true
 *         video_url:
 *           type: string
 *           nullable: true
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ExerciseWorkout:
 *       type: object
 *       properties:
 *         exercise_workout_id:
 *           type: integer
 *         exercise_id:
 *           type: integer
 *         workout_id:
 *           type: integer
 *         sets:
 *           type: integer
 *         reps:
 *           type: integer
 *         rest_time:
 *           type: integer
 *           nullable: true
 *         ordinal_number:
 *           type: integer
 *       required:
 *         - exercise_workout_id
 *         - exercise_id
 *         - workout_id
 *         - sets
 *         - reps
 *         - ordinal_number

 *     CreateExerciseWorkout:
 *       type: object
 *       properties:
 *         exercise_id:
 *           type: integer
 *         workout_id:
 *           type: integer
 *         sets:
 *           type: integer
 *         reps:
 *           type: integer
 *         rest_time:
 *           type: integer
 *           nullable: true
 *         ordinal_number:
 *           type: integer
 *       required:
 *         - exercise_id
 *         - workout_id
 *         - sets
 *         - reps
 *         - ordinal_number

 *     UpdateExerciseWorkout:
 *       type: object
 *       properties:
 *         sets:
 *           type: integer
 *         reps:
 *           type: integer
 *         rest_time:
 *           type: integer
 *           nullable: true
 *         ordinal_number:
 *           type: integer
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ExerciseProgress:
 *       type: object
 *       properties:
 *         exercise_progress_id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         exercise_id:
 *           type: integer
 *         exercise_date:
 *           type: string
 *           format: date
 *         equipment:
 *           type: string
 *           nullable: true
 *         sets:
 *           type: integer
 *         reps:
 *           type: integer
 *         notes:
 *           type: string
 *           nullable: true
 *       required:
 *         - exercise_progress_id
 *         - user_id
 *         - exercise_id
 *         - exercise_date
 *         - sets
 *         - reps

 *     CreateExerciseProgress:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *         exercise_id:
 *           type: integer
 *         exercise_date:
 *           type: string
 *           format: date
 *         equipment:
 *           type: string
 *           nullable: true
 *         sets:
 *           type: integer
 *         reps:
 *           type: integer
 *         notes:
 *           type: string
 *           nullable: true
 *       required:
 *         - user_id
 *         - exercise_id
 *         - exercise_date
 *         - sets
 *         - reps

 *     UpdateExerciseProgress:
 *       type: object
 *       properties:
 *         exercise_date:
 *           type: string
 *           format: date
 *         equipment:
 *           type: string
 *           nullable: true
 *         sets:
 *           type: integer
 *         reps:
 *           type: integer
 *         notes:
 *           type: string
 *           nullable: true
 */