import { NextFunction, Request, Response } from 'express';
import { GetTimetableDto } from '@dtos/timetables.dto';
import { Workhour } from '@/interfaces/workhours.interface';
import workhourService from '@services/workhours.service';

class IndexController {
  public workhourService = new workhourService();

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

      const getWorkhourData: number = await this.workhourService.findAllWorkhours;

      res.status(201).json({ data: getWorkhourData, message: 'getData' });
    } catch (error) {
      next(error);
    }
  };
}
export default IndexController;
