export interface UserProfile {
    favoriteGenres: { id: number; weight: number }[];
    favoriteActors: { id: number; name: string; count: number }[];
    favoriteDirectors: { id: number; name: string; count: number }[];
    commonKeywords: { id: number; name: string; count: number }[];
    avgRating: number;
}

export interface RecommendationResult {
    content: any; // Will use ContentItem from db.ts
    score: number;
    reasons: string[];
}

export interface SignalScores {
    similarityScore: number;
    castCrewScore: number;
    keywordScore: number;
    genreScore: number;
    ratingScore: number;
}
