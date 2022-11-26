import { NextFunction, Request, Response } from 'express';
import { GetTimetableDto } from '@dtos/timetables.dto';
import { findDateDto } from '@dtos/workhours.dto';
import { WorkDay } from '@/interfaces/workhours.interface';
import { DayTimetable, Timeslot } from '@/interfaces/timeslot.interface';
import workhourService from '@services/workhours.service';
import { getDateString, getTomorrow, changeTimezone } from '@utils/util';

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

      // default parameters
      timetableData.days = timetableData.days ?? 1;
      timetableData.is_ignore_schedule = timetableData.is_ignore_schedule ?? false;
      timetableData.is_ignore_workhour = timetableData.is_ignore_workhour ?? false;
      timetableData.timeslot_interval = timetableData.timeslot_interval ?? 1800;

      // 시작일 Date 객체 생성
      let startDate: Date = new Date(getDateString(timetableData.start_day_identifier));
      startDate = timetableData.timezone_identifier ? changeTimezone(startDate, timetableData.timezone_identifier) : startDate;

      const findData: findDateDto = { start_date: startDate, days: timetableData.days, is_ignore_workhour: timetableData.is_ignore_workhour };
      // 운영시간 정보 객체 가져오기
      const getWorkhourData: WorkDay[] = await this.workhourService.findWorkhourByDate(findData);
      res.status(201).json({ data: getWorkhourData, message: 'getData' });
    } catch (error) {
      next(error);
    }
  };
}
export default IndexController;
