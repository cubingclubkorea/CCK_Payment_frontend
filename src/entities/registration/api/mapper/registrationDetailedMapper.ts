import type { RegistrationDetailedDTO } from '../dto/registrationDetailed.dto';
import type { RegistrationDetailed } from '../../model/registrationDetailed';

export const RegistrationDetailedMapper = (dto: RegistrationDetailedDTO): RegistrationDetailed => ({
  id: dto.id,
  competitionId: dto.competitionId,
  competitionName: dto.competitionName,
  name: dto.name,
  enName: dto.enName,
  email: dto.email,
  phone: dto.phone,
  cckId: dto.cckId,
  wcaId: dto.wcaId,
  birthDate: new Date(dto.birthDate),
  emergencyPhone: dto.emergencyPhone,
  emergencyContact: dto.emergencyContact,
  selectedEvents: dto.selectedEvents,
  totalFee: dto.totalFee,
  paymentStatus: dto.paymentStatus,
  registrationStatus: dto.registrationStatus,
  needRfCard: dto.needRfCard,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt),
});
