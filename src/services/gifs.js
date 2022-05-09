const tenorGifsUrl = import.meta.env.VITE_TENOR_GIFS_URL;
const tenorGifsApiKey = import.meta.env.VITE_TENOR_GIFS_API_KEY;

const searchGifs = async ({ query, next }) => {
  try {
    const response = await fetch(
      `${tenorGifsUrl}/search?q=${query}&key=${tenorGifsApiKey}&media_filter=minimal&limit=9&pos=${next}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { searchGifs };
