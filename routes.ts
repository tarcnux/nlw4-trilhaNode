import { Router } from 'express';
import { SurveysController } from './src/controllers/SurveysController';
import { UsersController } from './src/controllers/UsersController';

const router = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();

//Users
router.post('/users', usersController.create);
router.get('/users', usersController.show);

//Surveys
router.post('/surveys', surveysController.create);
router.get('/surveys', surveysController.show);

export { router };
