import { apiClient } from '@/shared/api/base';

const BASE_URL = '/registration';

export const deleteRegistration = async (id: number): Promise<void> => {
  await apiClient.delete<void>(`${BASE_URL}/${id}`);
};