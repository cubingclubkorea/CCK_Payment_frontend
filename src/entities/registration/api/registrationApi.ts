import type { RegistrationDTO } from './dto/registration.dto';
import type { RegistrationDetailedDTO } from './dto/registrationDetailed.dto';
import type { Page } from '@/shared/model/page';
import type { PageQuery } from '@/shared/query/pageQuery';
import { mapPageableToParams } from '@/shared/query/pageQueryMapper';
import type { Registration } from '../model/registration';
import type { RegistrationDetailed } from '../model/registrationDetailed';
import { RegistrationMapper } from './mapper/registrationMapper';
import { RegistrationDetailedMapper } from './mapper/registrationDetailedMapper';
import { apiClient } from '@/shared';

const BASE_URL = '/registration';

/**
 * 등록 ID로 상세 조회
 */
export const getRegistrationById = async (id: number): Promise<RegistrationDetailed> => {
  const data = await apiClient.get<RegistrationDetailedDTO>(`${BASE_URL}/${id}`);
  return RegistrationDetailedMapper(data);
};

/**
 * 유저의 등록 목록 조회
 */
export const getRegistrationsByUser = async (params?: PageQuery): Promise<Page<Registration>> => {
  const data = await apiClient.get<Page<RegistrationDTO>>(`${BASE_URL}/user`, mapPageableToParams(params));
  
  return {
    content: data.content.map(RegistrationMapper),
    page: data.page,
  };
};

/**
 * 대회별 Pending 등록 목록 조회
 */
export const getRegistrationsByCompPending = async (
  compIdx: number,
  params?: PageQuery
): Promise<Page<Registration>> => {
  const data = await apiClient.get<Page<RegistrationDTO>>(
    `${BASE_URL}/comp/${compIdx}/pending`,
    mapPageableToParams(params)
  );
  
  return {
    content: data.content.map(RegistrationMapper),
    page: data.page,
  };
};

/**
 * 대회별 Confirmed 등록 목록 조회
 */
export const getRegistrationsByCompConfirmed = async (
  compIdx: number,
  params?: PageQuery
): Promise<Page<Registration>> => {
  const data = await apiClient.get<Page<RegistrationDTO>>(
    `${BASE_URL}/comp/${compIdx}/confirmed`,
    mapPageableToParams(params)
  );
  
  return {
    content: data.content.map(RegistrationMapper),
    page: data.page,
  };
};

/**
 * 대회별 Cancelled 등록 목록 조회
 */
export const getRegistrationsByCompCancelled = async (
  compIdx: number,
  params?: PageQuery
): Promise<Page<Registration>> => {
  const data = await apiClient.get<Page<RegistrationDTO>>(
    `${BASE_URL}/comp/${compIdx}/cancelled`,
    mapPageableToParams(params)
  );
  
  return {
    content: data.content.map(RegistrationMapper),
    page: data.page,
  };
};