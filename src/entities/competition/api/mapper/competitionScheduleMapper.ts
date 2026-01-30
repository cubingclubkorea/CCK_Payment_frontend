import type { CompetitionScheduleDTO } from '../dto/competitionSchedule.dto';
import type { CompetitionSchedule } from '../../model/competitionSchedule';
import { RoundScheduleMapper } from './roundScheduleMapper';

export const CompetitionScheduleMapper = (dto: CompetitionScheduleDTO): CompetitionSchedule => ({
  idx: dto.idx,
  compName: dto.compName,
  compDateStart: new Date(dto.compDateStart),
  compDateEnd: new Date(dto.compDateEnd),
  roundSchedules: dto.roundSchedules.map(RoundScheduleMapper),
});
