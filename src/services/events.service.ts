import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { Event } from '@interfaces/events.interface';
import { Timeslot } from '@/interfaces/timeslot.interface';
import eventModel from '@models/events.model';
import { isEmpty } from '@utils/util';

class EventService {
  public events = eventModel;

  public async findEventByDate(start_of_day: number, open_interval: number, close_interval: number): Promise<Event[]> {
    const findEvents: Event[] = this.events.filter(
      event => event.begin_at > start_of_day + open_interval && event.end_at < start_of_day + close_interval,
    );
    if (!findEvents) throw new HttpException(409, "Event doesn't exist");

    return findEvents;
  }

  public exceptEventTime(events: Timeslot[], start: number, end: number): Event[] {
    const eventData = this.validEvents(events);
    const ary = [];
    let tmpStart = start;
    eventData.map(item => {
      if (item.begin_at === item.end_at) {
      } else if (item.begin_at >= tmpStart && item.end_at <= end) {
        ary.push({ begin_at: tmpStart, end_at: item.begin_at });
        tmpStart = item.end_at;
      }
    });

    if (tmpStart <= end) {
      ary.push({ begin_at: tmpStart, end_at: end });
    }

    return ary;
  }

  public validEvents(events: Event[]): Event[] {
    events.forEach((item, idx, ary) => {
      if (item.begin_at > item.end_at) {
        const tmp = item.begin_at;
        ary[idx].begin_at = item.end_at;
        ary[idx].end_at = tmp;
      }
    });

    return events;
  }

  public getTimeSlots = (timeslots: Timeslot[], service_duration: number, timeslot_interval: number): Timeslot[] => {
    const ary = [];

    timeslots.forEach(item => {
      const begin = item.begin_at;
      const end = item.end_at;
      let tmp_begin = begin;
      while (tmp_begin < end) {
        const service_end = tmp_begin + service_duration;
        const timeslot_end = tmp_begin + timeslot_interval;
        if (service_end <= end && timeslot_end <= end) {
          ary.push({ begin_at: tmp_begin, end_at: service_end });
          tmp_begin = timeslot_end;
        } else {
          break;
        }
      }
    });

    return ary;
  };
}

export default EventService;
