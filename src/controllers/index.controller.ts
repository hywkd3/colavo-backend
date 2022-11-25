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

      const findData = { start_day_identifier: timetableData.start_day_identifier, days: timetableData.days };
      const getWorkhourData: Workhour[] = await this.workhourService.findWorkhourByDate(findData);

      res.status(201).json({ data: getWorkhourData, message: 'getData' });
    } catch (error) {
      next(error);
    }
  };
}
export default IndexController;
