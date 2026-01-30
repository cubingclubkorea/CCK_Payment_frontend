import { apiClient } from '@/shared/api/base';
import type { RegistrationCreateDTO } from './api/dto/registrationCreate.dto';

const BASE_URL = '/registration';

export const createRegistration = async (dto: RegistrationCreateDTO): Promise<void> => {
  await apiClient.post<void, RegistrationCreateDTO>(BASE_URL, dto);
};