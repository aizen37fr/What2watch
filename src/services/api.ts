import { fetchTMDB } from './tmdb';
import { fetchAniList } from './anilist';
import { db } from '../data/db'; // Fallback
import type { ContentItem, ContentType, Mood, Language } from '../data/db';

export async function fetchContent(
    type: ContentType,
    mood: Mood,
    language: Language,
    providerId?: number
): Promise<ContentItem[]> {
    console.log(`Fetching ${type} for mood ${mood} in ${language} (Provider: ${providerId})...`);

    let items: ContentItem[] = [];

    try {
        if (type === 'anime') {
            items = await fetchAniList(mood);
        } else {
            // Map 'series', 'kdrama', 'cdrama' to TMDB's 'tv'
            let tmdbType: 'movie' | 'tv' = 'movie';
            let queryLanguage = language;

            if (type === 'series' || type === 'kdrama' || type === 'cdrama') {
                tmdbType = 'tv';
            }

            // Force original language for specific categories to ensure correct content
            if (type === 'kdrama') queryLanguage = 'Korean';
            if (type === 'cdrama') queryLanguage = 'Chinese';

            items = await fetchTMDB(tmdbType, mood, queryLanguage, providerId);
        }
    } catch (error) {
        console.error("API Fetch Failed", error);
    }

    // If API returns empty or fails, fall back to local DB
    // Filtering local DB to match request
    if (items.length === 0) {
        console.warn("API returned no results, using fallback DB");
        items = db.filter(item =>
            item.type === type &&
            item.moods.includes(mood) &&
            (item.language === language || language === 'English') // Loose fallback for lang
        );
    }

    return items;
}
