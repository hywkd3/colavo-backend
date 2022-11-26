export interface Workhour {
  close_interval: number;
  is_day_off: boolean;
  key: string;
  open_interval: number;
  weekday: number;
}
export interface WorkDay {
  weekday: number;
  day_modifier: number;
  start_of_day: number;
  close_interval: number;
  is_day_off: boolean;
  key: string;
  open_interval: number;
  timeslots?: Object[];
}
