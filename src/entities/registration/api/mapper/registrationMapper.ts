import type { RegistrationDTO } from '../dto/registration.dto';
import type { Registration } from '../../model/registration';

export const RegistrationMapper = (dto: RegistrationDTO): Registration => ({
  id: dto.id,
  competitionId: dto.competitionId,
  competitionName: dto.competitionName,
  name: dto.name,
  enName: dto.enName,
  cckId: dto.cckId,
  selectedEvents: dto.selectedEvents,
  totalFee: dto.totalFee,
  paymentStatus: dto.paymentStatus,
  registrationStatus: dto.registrationStatus,
  needRfCard: dto.needRfCard,
});
