export interface RoundScheduleDTO {
  idx: number;
  cubeEvent: string;
  roundName: string;
  eventStart: string;        // LocalDateTime
  eventEnd: string;          // LocalDateTime
  groupList: string[];
  cutoff: number;
  timeLimit: number;
  advance: number;
}
