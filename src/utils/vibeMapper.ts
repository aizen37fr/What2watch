import type { Mood } from '../data/db';

interface VibeResponse {
    mood: Mood;
    keywords: string[]; // TMDB query keywords
}

// Simple rule-based "AI" to map input -> Vibe
export const mapVibeToQuery = (input: string): VibeResponse | null => {
    const text = input.toLowerCase();

    // Map common phrases to our Moods
    if (text.includes('sad') || text.includes('cry') || text.includes('breakup') || text.includes('tear')) {
        return { mood: 'Emotional', keywords: ['drama', 'romance'] };
    }
    if (text.includes('laugh') || text.includes('funny') || text.includes('comedy') || text.includes('happy')) {
        return { mood: 'Laugh', keywords: ['comedy'] };
    }
    if (text.includes('scary') || text.includes('horror') || text.includes('dark') || text.includes('nightmare')) {
        return { mood: 'Scared', keywords: ['horror', 'thriller'] };
    }
    if (text.includes('action') || text.includes('fast') || text.includes('fight') || text.includes('explosion')) {
        return { mood: 'Excited', keywords: ['action', 'adventure'] };
    }
    if (text.includes('mind') || text.includes('think') || text.includes('twist') || text.includes('confus')) {
        return { mood: 'Mind-bending', keywords: ['science fiction', 'mystery'] };
    }
    if (text.includes('chill') || text.includes('relax') || text.includes('calm') || text.includes('background')) {
        return { mood: 'Chill', keywords: ['animation', 'family', 'documentary'] };
    }

    return null; // No clear match
};
