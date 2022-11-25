import { hash } from 'bcrypt';
import { findDateDto } from '@dtos/workhours.dto';
import { HttpException } from '@exceptions/HttpException';
import { Workhour } from '@interfaces/workhours.interface';
import workhourModel from '@models/workhours.model';

class WorkhourService {
  public workhours = workhourModel;

  public async findAllWorkhours(): Promise<Workhour[]> {
    const workhours: Workhour[] = this.workhours;
    return workhours;
  }
}

export default WorkhourService;
