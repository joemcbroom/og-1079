import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const getChats = async () => {
  try {
    let { data, error } = await supabase
      .from('chats')
      .select(
        `
        id,
        text,
        likes,
        profile (
            id,
            username,
            avatar_url,
            color
        )
      `
      )
      .order('created_at', 'desc');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const makeUserAdmin = async (id) => {
  try {
    const updates = {
      id,
      isAdmin: true,
      updated_at: new Date(),
    };

    let { error } = await supabase.from('profiles').upsert(updates);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

const addLikeToChat = async ({ likes, id, userId }) => {
  const newLikes = likes !== null ? [...likes, userId] : [userId];
  try {
    let { error } = await supabase
      .from('chats')
      .update({ likes: newLikes })
      .match({ id });

    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

const removeLikeFromChat = async ({ likes, id, userId }) => {
  const newLikes = likes.filter((like) => like !== userId);
  try {
    let { error } = await supabase
      .from('chats')
      .update({ likes: newLikes.length ? newLikes : null })
      .match({ id });

    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

const addOrRemoveLike = async (chat) => {
  const { likes, id } = chat;
  const userId = supabase.auth.user().id;
  if (likes === null || !likes.includes(userId)) {
    await addLikeToChat({ likes, id, userId });
  } else {
    await removeLikeFromChat({ likes, id, userId });
  }
};

const getUserProfile = async (id) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateUserColor = async (color) => {
  const { id } = supabase.auth.user();
  try {
    let { error } = await supabase.from('profiles').update({ color }).eq(id);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

const postChat = async (text) => {
  const body = {
    text,
    profile: supabase.auth.user().id,
  };
  try {
    const { error } = await supabase.from('chats').insert([body]);
    if (error) throw error;
    return;
  } catch (error) {
    console.error(error);
  }
};

export {
  supabase,
  getChats,
  getUserProfile,
  postChat,
  addLikeToChat,
  removeLikeFromChat,
  addOrRemoveLike,
  getAllUsers,
  makeUserAdmin,
};
