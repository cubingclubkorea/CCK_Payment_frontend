import type { PaymentStatus } from '../../model/paymentStatus';
import type { RegistrationStatus } from '../../model/registrationStatus';

export interface RegistrationDetailedDTO {
  id: number;
  competitionId: number;
  competitionName: string;
  name: string;
  enName: string;
  email: string;
  phone: string;
  cckId: string;
  wcaId: string;
  birthDate: string;           // LocalDate
  emergencyPhone: string;
  emergencyContact: string;
  selectedEvents: string[];
  totalFee: number;
  paymentStatus: PaymentStatus;
  registrationStatus: RegistrationStatus;
  needRfCard: boolean;
  createdAt: string;           // LocalDateTime
  updatedAt: string;           // LocalDateTime
}
