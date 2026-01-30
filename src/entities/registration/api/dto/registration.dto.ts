import type { PaymentStatus } from '../../model/paymentStatus';
import type { RegistrationStatus } from '../../model/registrationStatus';

export interface RegistrationDTO {
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
