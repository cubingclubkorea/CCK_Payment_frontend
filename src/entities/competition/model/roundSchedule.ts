export interface RoundSchedule {
  idx: number;
  cubeEvent: string;
  roundName: string;
  eventStart: Date;
  eventEnd: Date;
  groupList: string[];
  cutoff: number;
  timeLimit: number;
  advance: number;
}
