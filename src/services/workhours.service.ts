import { hash } from 'bcrypt';
import { findDateDto } from '@dtos/workhours.dto';
import { HttpException } from '@exceptions/HttpException';
import { Workhour } from '@interfaces/workhours.interface';
import workhourModel from '@models/workhours.model';
import { getDayNumber, getNumberAry } from '@utils/util';

class WorkhourService {
  public workhours = workhourModel;

  public async findAllWorkhours(): Promise<Workhour[]> {
    const workhours: Workhour[] = this.workhours;
    return workhours;
  }

  public async findWorkhourByDate(findData: findDateDto): Promise<Workhour[]> {
    const startDayNumber = getDayNumber(findData.start_day_identifier);
    const weekNumberAry = getNumberAry(startDayNumber, findData.days);

    const findWorkhours: Workhour[] = this.workhours.filter(workhour => weekNumberAry.includes(workhour.weekday));
    if (!findWorkhours) throw new HttpException(409, "workhours doesn't exist");

    return findWorkhours;
  }
}

export default WorkhourService;
