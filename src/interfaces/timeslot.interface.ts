export interface Timeslot {
  begin_at: number; // required
  end_at: number;
}

export interface DayTimetable {
  start_of_day: number; // Unixstamp seconds
  day_modifier: number;
  is_day_off: boolean;
  timeslots: Timeslot[];
}
