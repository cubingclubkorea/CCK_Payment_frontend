import type { RoundSchedule } from './roundSchedule';

export interface CompetitionSchedule {
  idx: number;
  compName: string;
  compDateStart: Date;
  compDateEnd: Date;
  roundSchedules: RoundSchedule[];
}
