import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { GetTimetableDto } from '@dtos/timetables.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.post(`${this.path}getTimeSlots`, validationMiddleware(GetTimetableDto, 'body'), this.indexController.getDayTimetable);
  }
}

export default IndexRoute;
