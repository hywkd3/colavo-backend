import { hash } from 'bcrypt';
import { findDateDto } from '@dtos/workhours.dto';
import { HttpException } from '@exceptions/HttpException';
import { Workhour } from '@interfaces/workhours.interface';
import workhourModel from '@models/workhours.model';
import { getDayNumber, getWeekAry, getDayUnix } from '@utils/util';

class WorkhourService {
  public workhours = workhourModel;

  public async findAllWorkhours(): Promise<Workhour[]> {
    const workhours: Workhour[] = this.workhours;
    return workhours;
  }

  public async findWorkhourByDate(findData: findDateDto): Promise<Workhour[]> {
    const weekAry = getWeekAry(findData.start_day_identifier, findData.days);

    const weekNumAry = weekAry.map(i => i.weekday);
    const findWorkhours = this.workhours.filter(workhour => weekNumAry.includes(workhour.weekday));
    if (!findWorkhours) throw new HttpException(409, "workhours doesn't exist");

    const result = weekAry.map(item => {
      const a = findWorkhours.find(workhour => item.weekday === workhour.weekday);
      return { ...item, ...a };
    });

    return result;
  }
}

export default WorkhourService;
