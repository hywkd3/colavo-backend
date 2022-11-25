import { IsInt, IsString } from 'class-validator';

export class findDateDto {
  @IsString()
  public start_day_identifier: string;

  @IsInt()
  public days: number;
}
