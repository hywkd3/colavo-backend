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

}

export default EventService;
