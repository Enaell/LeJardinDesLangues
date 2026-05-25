import { useCallback } from 'react';
import {
  usersControllerGetMyProfile,
  usersControllerUpdateMyProfile,
  usersControllerDeleteMyAccount,
} from '@core/api/utilisateurs/utilisateurs';
import type { UpdateProfileDto } from '@core/api/model';

export const useProfileApi = () => {
  const getMyProfile = useCallback(async (): Promise<void> => {
    const response = await usersControllerGetMyProfile();
    if (response.status === 200) return response.data;
    throw new Error('Unauthorized');
  }, []);

  const updateMyProfile = useCallback(
    async (data: UpdateProfileDto): Promise<void> => {
      const response = await usersControllerUpdateMyProfile(data);
      if (response.status === 200) return response.data;
      throw new Error('Unexpected profile update response');
    },
    [],
  );

  const deleteMyAccount = useCallback(async (): Promise<void> => {
    const response = await usersControllerDeleteMyAccount();
    if (response.status === 200) return response.data;
    throw new Error('Unexpected delete account response');
  }, []);

  return { getMyProfile, updateMyProfile, deleteMyAccount };
};
