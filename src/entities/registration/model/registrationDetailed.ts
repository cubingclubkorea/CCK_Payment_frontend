import type { PaymentStatus } from './paymentStatus';
import type { RegistrationStatus } from './registrationStatus';

export interface RegistrationDetailed {
  id: number;
  competitionId: number;
  competitionName: string;
  name: string;
  enName: string;
  email: string;
  phone: string;
  cckId: string;
  wcaId: string;
  birthDate: Date;
  emergencyPhone: string;
  emergencyContact: string;
  selectedEvents: string[];
  totalFee: number;
  paymentStatus: PaymentStatus;
  registrationStatus: RegistrationStatus;
  needRfCard: boolean;
  createdAt: Date;
  updatedAt: Date;
}
