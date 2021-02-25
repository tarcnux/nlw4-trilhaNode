import { Router } from 'express';
import { SurveysController } from './src/controllers/SurveysController';
import { UsersController } from './src/controllers/UsersController';

const router = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();

router.post('/users', usersController.create);
router.post('/surveys', surveysController.create);

export { router };
