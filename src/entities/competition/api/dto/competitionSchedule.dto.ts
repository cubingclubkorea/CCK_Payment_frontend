import type { RoundScheduleDTO } from './roundSchedule.dto';

export interface CompetitionScheduleDTO {
  idx: number;
  compName: string;
  compDateStart: string;       // LocalDate
  compDateEnd: string;         // LocalDate
  roundSchedules: RoundScheduleDTO[];
}
