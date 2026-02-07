/**
 * OMDb API Service
 * Alternative to TMDB - works without network restrictions
 * Supports movies, TV series, K-dramas, C-dramas, all international content
 */

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'b9a5d1d8'; // Free demo key
const OMDB_BASE = 'https://www.omdbapi.com/';

interface OMDbSearchResult {
    Title: string;
    Year: string;
    imdbID: string;
    Type: 'movie' | 'series' | 'episode';
    Poster: string;
}

interface OMDbDetailResult {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Array<{ Source: string; Value: string }>;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: 'movie' | 'series' | 'episode';
    totalSeasons?: string;
    Response: string;
}

/**
 * Search for movies and TV shows by title
 */
export async function searchByTitle(query: string): Promise<OMDbSearchResult[]> {
    try {
        const url = `${OMDB_BASE}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`;
        const seriesUrl = `${OMDB_BASE}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=series`;

        // Search both movies and series
        const [movieResponse, seriesResponse] = await Promise.all([
            fetch(url),
            fetch(seriesUrl)
        ]);

        const movieData = await movieResponse.json();
        const seriesData = await seriesResponse.json();

        const results: OMDbSearchResult[] = [];

        if (movieData.Response === 'True' && movieData.Search) {
            results.push(...movieData.Search);
        }

        if (seriesData.Response === 'True' && seriesData.Search) {
            results.push(...seriesData.Search);
        }

        return results;
    } catch (error) {
        console.error('OMDb search error:', error);
        return [];
    }
}

/**
 * Get detailed information about a specific title
 */
export async function getDetails(imdbId: string): Promise<OMDbDetailResult | null> {
    try {
        const url = `${OMDB_BASE}?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=full`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'True') {
            return data;
        }

        return null;
    } catch (error) {
        console.error('OMDb details error:', error);
        return null;
    }
}

/**
 * Convert OMDb rating to 0-10 scale
 */
export function normalizeRating(rating: string): number {
    const num = parseFloat(rating);
    return isNaN(num) ? 0 : num;
}

/**
 * Convert OMDb result to our ContentItem format
 */
export function convertToContentItem(omdb: OMDbDetailResult): any {
    const rating = normalizeRating(omdb.imdbRating);
    const genres = omdb.Genre.split(', ');
    const year = parseInt(omdb.Year.substring(0, 4));

    return {
        id: omdb.imdbID,
        title: omdb.Title,
        type: omdb.Type === 'series' ? 'tv' : 'movie',
        year: year,
        genres: genres,
        rating: rating,
        image: omdb.Poster !== 'N/A' ? omdb.Poster : '',
        overview: omdb.Plot,
        language: omdb.Language.split(', ')[0],
        country: omdb.Country.split(', ')[0]
    };
}
