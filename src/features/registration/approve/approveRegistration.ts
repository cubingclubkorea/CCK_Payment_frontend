import { apiClient } from '@/shared/api/base';

const BASE_URL = '/registration';

export const approveRegistration = async (id: number): Promise<void> => {
  await apiClient.patch<void>(`${BASE_URL}/${id}/approve`);
};