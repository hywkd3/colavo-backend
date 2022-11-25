import { IsInt, IsBoolean, IsString } from 'class-validator';

export class GetTimetableDto {
  @IsString()
  public start_day_identifier: string;

  @IsInt()
  public days: number;

  @IsInt()
  public service_duration: number;

  @IsInt()
  public timeslot_interval: number;

  @IsBoolean()
  public is_ignore_schedule: boolean;

  @IsBoolean()
  public is_ignore_workhour: boolean;

  @IsString()
  public timezone_identifier: string;
}
