import { hash } from 'bcrypt';
import { findDateDto } from '@dtos/workhours.dto';
import { HttpException } from '@exceptions/HttpException';
import { Workhour, WorkDay } from '@interfaces/workhours.interface';
import workhourModel from '@models/workhours.model';
import { getWeekAry } from '@utils/util';

class WorkhourService {
  public workhours = workhourModel;

  public async findAllWorkhours(): Promise<Workhour[]> {
    const workhours: Workhour[] = this.workhours;
    return workhours;
  }

  public async findWorkhourByDate(findData: findDateDto): Promise<WorkDay[]> {
    const weekAry = getWeekAry(findData.start_date, findData.days);

    const weekNumAry = weekAry.map(i => i.weekday);
    const findWorkhours = this.workhours.filter(
      workhour => weekNumAry.includes(workhour.weekday) && (findData.is_ignore_workhour ? true : !workhour.is_day_off),
    );
    if (!findWorkhours) throw new HttpException(409, "workhours doesn't exist");

    const result = weekAry.map(item => {
      const a = findWorkhours.find(workhour => item.weekday === workhour.weekday);
      return { ...item, ...a };
    });

    return result;
  }
}

export default WorkhourService;
