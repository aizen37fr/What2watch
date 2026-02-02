// New functions for recommendations - append to tmdb.ts

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetch similar content
export async function fetchSimilar(tmdbId: number, type: 'movie' | 'tv'): Promise<any[]> {
    if (!API_KEY) return [];

    try {
        const url = `${BASE_URL}/${type}/${tmdbId}/similar?api_key=${API_KEY}&language=en-US&page=1`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results || [];
    } catch (err) {
        console.error('Error fetching similar:', err);
        return [];
    }
}

// Fetch TMDB recommendations
export async function fetchRecommendations(tmdbId: number, type: 'movie' | 'tv'): Promise<any[]> {
    if (!API_KEY) return [];

    try {
        const url = `${BASE_URL}/${type}/${tmdbId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results || [];
    } catch (err) {
        console.error('Error fetching recommendations:', err);
        return [];
    }
}

// Fetch credits (cast & crew)
export async function fetchCredits(tmdbId: number, type: 'movie' | 'tv'): Promise<{ cast: any[]; crew: any[] }> {
    if (!API_KEY) return { cast: [], crew: [] };

    try {
        const url = `${BASE_URL}/${type}/${tmdbId}/credits?api_key=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        return {
            cast: data.cast || [],
            crew: data.crew || []
        };
    } catch (err) {
        console.error('Error fetching credits:', err);
        return { cast: [], crew: [] };
    }
}

// Fetch keywords
export async function fetchKeywords(tmdbId: number, type: 'movie' | 'tv'): Promise<any[]> {
    if (!API_KEY) return [];

    try {
        const url = `${BASE_URL}/${type}/${tmdbId}/keywords?api_key=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        return type === 'movie' ? (data.keywords || []) : (data.results || []);
    } catch (err) {
        console.error('Error fetching keywords:', err);
        return [];
    }
}

// Fetch content by actor
export async function fetchByActor(actorId: number): Promise<any[]> {
    if (!API_KEY) return [];

    try {
        const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_cast=${actorId}&sort_by=popularity.desc&page=1`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results || [];
    } catch (err) {
        console.error('Error fetching by actor:', err);
        return [];
    }
}

// Fetch content by director
export async function fetchByDirector(directorId: number): Promise<any[]> {
    if (!API_KEY) return [];

    try {
        const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_crew=${directorId}&sort_by=popularity.desc&page=1`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results || [];
    } catch (err) {
        console.error('Error fetching by director:', err);
        return [];
    }
}

// Helper to extract TMDB ID from content ID
export function extractTMDBId(contentId: string): { id: number; type: 'movie' | 'tv' } | null {
    // contentId format: "m-123" for movies, "s-456" for series
    const match = contentId.match(/^([ms])-(\d+)$/);
    if (!match) return null;

    return {
        id: parseInt(match[2]),
        type: match[1] === 'm' ? 'movie' : 'tv'
    };
}
