import { NextFunction, Request, Response } from 'express';
import { GetTimetableDto } from '@dtos/timetables.dto';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public getDayTimetable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const timetableData: GetTimetableDto = req.body;

      res.status(201).json({ data: { test: 1 }, message: 'getData' });
    } catch (error) {
      next(error);
    }
  };
}
export default IndexController;
