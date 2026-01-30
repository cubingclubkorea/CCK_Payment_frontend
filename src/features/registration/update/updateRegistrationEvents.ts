import { apiClient } from "@/shared/api/base";
import type { RegistrationUpdateEventsDTO } from "./api/dto/registrationUpdateEvents.dto";

const BASE_URL = '/registration';

export const updateRegistrationEvents = async (dto: RegistrationUpdateEventsDTO): Promise<void> => {
  await apiClient.patch<void, RegistrationUpdateEventsDTO>(`${BASE_URL}/events`, dto);
};