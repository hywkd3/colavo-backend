import { NextFunction, Request, Response } from 'express';
import { GetTimetableDto } from '@dtos/timetables.dto';
import { findDateDto } from '@dtos/workhours.dto';
import { WorkDay } from '@/interfaces/workhours.interface';
import { DayTimetable, Timeslot } from '@/interfaces/timeslot.interface';
import workhourService from '@services/workhours.service';
import eventService from '@services/events.service';
import { getDateString, getTomorrow, changeTimezone } from '@utils/util';

class IndexController {
  public workhourService = new workhourService();
  public eventService = new eventService();

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

      // Timeslot 생성
      for (let i = 0; i < getWorkhourData.length; i++) {
        const data = getWorkhourData[i];
        const events = await this.eventService.findEventByDate(data.start_of_day, data.open_interval, data.close_interval);

        // 시간 범위 설정
        let start = 0;
        let end = 0;

        if (timetableData.is_ignore_workhour) {
          // 하루 전체를 기간으로 설정
          start = data.start_of_day;
          end = getTomorrow(data.start_of_day, 1);
        } else {
          // 영업시간으로 설정
          start = data.start_of_day + data.open_interval;
          end = data.start_of_day + data.close_interval;
        }

        let timeslots: Timeslot[];
        if (timetableData.is_ignore_schedule) {
          // 기존 이벤트 무시
          timeslots = [{ begin_at: start, end_at: end }];
        } else {
          // 기존 이벤트 제외 시간
          timeslots = await this.eventService.exceptEventTime(events, start, end);
        }

        timeslots = await this.eventService.getTimeSlots(timeslots, timetableData.service_duration, timetableData.timeslot_interval);

        getWorkhourData[i].timeslots = timeslots;
      }
      const DayTimetable = getWorkhourData.map(i => {
        const obj = {
          start_of_day: i.start_of_day,
          day_modifier: i.day_modifier,
          is_day_off: i.is_day_off,
          timeslots: i.timeslots,
        };
        return obj;
      });
      res.status(201).json({ data: DayTimetable, message: 'getData' });
    } catch (error) {
      next(error);
    }
  };
}
export default IndexController;
