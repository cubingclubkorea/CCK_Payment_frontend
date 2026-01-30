import type { PaymentStatus } from './paymentStatus';
import type { RegistrationStatus } from './registrationStatus';

export interface Registration {
  id: number;
  competitionId: number;
  competitionName: string;
  name: string;
  enName: string;
  cckId: string;
  selectedEvents: string[];
  totalFee: number;
  paymentStatus: PaymentStatus;
  registrationStatus: RegistrationStatus;
  needRfCard: boolean;
}
