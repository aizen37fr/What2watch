import type { ContentItem, Mood } from '../data/db';

const GRAPHQL_URL = 'https://graphql.anilist.co';

// AniList Tags/Genres mapping
const MOOD_TAGS: Record<Mood, string[]> = {
  'Chill': ['Slice of Life', 'Comedy', 'Iyashikei'],
  'Excited': ['Action', 'Adventure', 'Sports'],
  'Emotional': ['Drama', 'Romance', 'Tragedy'],
  'Laugh': ['Comedy', 'Parody'],
  'Scared': ['Horror', 'Psychological', 'Thriller'],
  'Mind-bending': ['Sci-Fi', 'Mystery', 'Psychological', 'Time Travel']
};

export async function fetchAniList(mood: Mood): Promise<ContentItem[]> {
  const tags = MOOD_TAGS[mood];
  const randomTag = tags[Math.floor(Math.random() * tags.length)]; // Pick one tag to vary results

  const query = `
    query ($tag: String) {
      Page(page: 1, perPage: 15) {
        media(tag: $tag, type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
          id
          title {
            english
            romaji
          }
          description
          coverImage {
            extraLarge
          }
          averageScore
          seasonYear
          startDate {
            year
          }
          genres
          trailer {
             id
             site
          }
          externalLinks {
            site
            url
            icon
          }
        }
      }
    }
    `;

  try {
    const res = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { tag: randomTag }
      })
    });

    const data = await res.json();
    if (!data.data?.Page?.media) return [];

    return data.data.Page.media.map((item: any) => ({
      id: `a-${item.id}`,
      title: item.title.english || item.title.romaji,
      type: 'anime',
      moods: [mood],
      genres: item.genres,
      language: 'Japanese', // AniList is predominantly Japanese source
      rating: (item.averageScore || 0) / 10, // Convert 100 scale to 10
      year: item.seasonYear || item.startDate.year || 0,
      image: item.coverImage.extraLarge,
      description: item.description?.replace(/<[^>]*>?/gm, '') || '', // Strip HTML
      trailerKey: (item.trailer?.site === 'youtube') ? item.trailer.id : undefined,
      watchProviders: item.externalLinks?.filter((l: any) => l.site === 'Crunchyroll' || l.site === 'Netflix' || l.site === 'Hulu' || l.site === 'Funimation').slice(0, 3).map((l: any) => ({
        name: l.site,
        logo: l.icon || '', // AniList might not provide direct logo URL easily, text fallback or generic icon might be needed, for now using icon field if exists or we can mock
        link: l.url
      }))
    }));

  } catch (error) {
    console.error("AniList Fetch Error:", error);
    return [];
  }
}

/**
 * Get a random anime from AniList
 * Used by CineDetective for realistic scanning simulation
 */
export async function getRandomAnime(): Promise<ContentItem | null> {
  // Generate random page (AniList has ~20k anime, 50 per page = ~400 pages)
  const randomPage = Math.floor(Math.random() * 300) + 1;

  const query = `
    query ($page: Int) {
      Page(page: $page, perPage: 50) {
        media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
          id
          title {
            english
            romaji
          }
          description
          coverImage {
            extraLarge
          }
          averageScore
          seasonYear
          startDate {
            year
          }
          genres
          trailer {
            id
            site
          }
          externalLinks {
            site
            url
            icon
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { page: randomPage }
      })
    });

    const data = await res.json();
    if (!data.data?.Page?.media || data.data.Page.media.length === 0) {
      return null;
    }

    // Pick random anime from the page
    const media = data.data.Page.media;
    const randomIndex = Math.floor(Math.random() * media.length);
    const item = media[randomIndex];

    // Map to ContentItem format
    return {
      id: `anilist_${item.id}`,
      title: item.title.english || item.title.romaji,
      type: 'anime',
      moods: mapGenresToMoods(item.genres),
      genres: item.genres,
      language: 'Japanese',
      rating: (item.averageScore || 75) / 10,
      year: item.seasonYear || item.startDate?.year || 2020,
      image: item.coverImage.extraLarge,
      description: item.description?.replace(/<[^>]*>?/gm, '') || 'No description available.',
      trailerKey: (item.trailer?.site === 'youtube') ? item.trailer.id : undefined,
      watchProviders: item.externalLinks?.filter((l: any) => ['Crunchyroll', 'Netflix', 'Hulu', 'Funimation'].includes(l.site)).slice(0, 3).map((l: any) => ({
        name: l.site,
        logo: l.icon || '',
        link: l.url
      }))
    };

  } catch (error) {
    console.error("AniList Random Fetch Error:", error);
    return null;
  }
}

/**
 * Map AniList genres to our mood system
 */
function mapGenresToMoods(genres: string[]): Mood[] {
  const moods: Mood[] = [];

  if (genres.some(g => ['Action', 'Adventure', 'Sports'].includes(g))) moods.push('Excited');
  if (genres.includes('Comedy')) moods.push('Laugh');
  if (genres.some(g => ['Drama', 'Romance'].includes(g))) moods.push('Emotional');
  if (genres.some(g => ['Horror', 'Thriller'].includes(g))) moods.push('Scared');
  if (genres.some(g => ['Mystery', 'Psychological'].includes(g))) moods.push('Mind-bending');
  if (genres.includes('Slice of Life')) moods.push('Chill');

  // Default to Chill if no moods matched
  if (moods.length === 0) moods.push('Chill');

  return moods;
}

