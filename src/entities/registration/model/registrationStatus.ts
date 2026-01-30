export const RegistrationStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
} as const;

export type RegistrationStatus = typeof RegistrationStatus[keyof typeof RegistrationStatus];