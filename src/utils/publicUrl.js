import { useAuthStore } from '@/stores/auth';

export const getPublicUrl = (avatar_url) => {
  const { supabase } = useAuthStore();
  if (!avatar_url) return '';
  const storageUrl = supabase.storageUrl;
  return `${storageUrl}/object/public/avatars/${avatar_url}`;
};
