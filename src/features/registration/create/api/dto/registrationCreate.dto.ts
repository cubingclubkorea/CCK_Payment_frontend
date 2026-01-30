export interface RegistrationCreateDTO {
  competitionId: number;
  competitionName: string;
  phone: string;
  wcaId: string;
  emergencyPhone: string;
  emergencyContact: string;
  selectedEvents: string[];
}
