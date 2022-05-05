import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const getChats = async () => {
  try {
    let { data, error } = await supabase.from('chats').select(
      `
        id,
        text,
        profile (
            id,
            username,
            avatar_url
        )
      `
    );

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getUserProfile = async (id) => {
  try {
    const { data, error, status } = await supabase
      .from('profiles')
      .select('id, username, avatar_url')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { supabase, getChats, getUserProfile };
