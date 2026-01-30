import type { RoundScheduleDTO } from '../dto/roundSchedule.dto';
import type { RoundSchedule } from '../../model/roundSchedule';

export const RoundScheduleMapper = (dto: RoundScheduleDTO): RoundSchedule => ({
  idx: dto.idx,
  cubeEvent: dto.cubeEvent,
  roundName: dto.roundName,
  eventStart: new Date(dto.eventStart),
  eventEnd: new Date(dto.eventEnd),
  groupList: dto.groupList,
  cutoff: dto.cutoff,
  timeLimit: dto.timeLimit,
  advance: dto.advance,
});