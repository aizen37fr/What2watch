/**
 * DeepSeek AI Service
 * Free AI-powered scene analysis and content understanding
 */

const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

export interface SceneAnalysis {
    description: string;
    mood: string;
    setting: string;
    characters?: string[];
    genre?: string;
    confidence: number;
}

/**
 * Analyze a screenshot using DeepSeek Vision
 */
export async function analyzeScene(imageFile: File): Promise<SceneAnalysis | null> {
    if (!API_KEY) {
        console.warn('DeepSeek API key not found');
        return null;
    }

    try {
        // Convert image to base64
        const base64 = await fileToBase64(imageFile);

        console.log('🤖 DeepSeek: Analyzing scene...');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat', // Use chat model for now
                messages: [{
                    role: 'user',
                    content: `Analyze this screenshot and provide:
1. A brief description of what's happening (1 sentence)
2. The mood/atmosphere (happy/sad/tense/exciting/etc)
3. The setting (indoor/outdoor/city/nature/etc)
4. Likely genre (action/drama/comedy/romance/thriller/anime/etc)

Keep responses concise. Format as JSON:
{
  "description": "...",
  "mood": "...",
  "setting": "...",
  "genre": "..."
}`
                }],
                temperature: 0.3,
                max_tokens: 200
            })
        });

        if (!response.ok) {
            throw new Error(`DeepSeek API error: ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) {
            return null;
        }

        // Try to parse JSON response
        try {
            const parsed = JSON.parse(content);
            return {
                description: parsed.description || 'Unknown scene',
                mood: parsed.mood || 'neutral',
                setting: parsed.setting || 'unknown',
                genre: parsed.genre || 'unknown',
                confidence: 0.8
            };
        } catch {
            // Fallback: extract info from text
            return {
                description: content.substring(0, 100),
                mood: 'neutral',
                setting: 'unknown',
                confidence: 0.5
            };
        }

    } catch (error) {
        console.error('DeepSeek analysis error:', error);
        return null;
    }
}

/**
 * Get smart recommendations based on user query
 */
export async function getSmartRecommendations(query: string): Promise<string[]> {
    if (!API_KEY) return [];

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{
                    role: 'user',
                    content: `User wants: "${query}". Suggest 5 similar movies/shows. Return only titles as JSON array: ["Title 1", "Title 2", ...]`
                }],
                temperature: 0.7,
                max_tokens: 150
            })
        });

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) return [];

        // Parse JSON array
        const titles = JSON.parse(content);
        return Array.isArray(titles) ? titles : [];

    } catch (error) {
        console.error('DeepSeek recommendations error:', error);
        return [];
    }
}

/**
 * Generate engaging content description
 */
export async function generateDescription(title: string, genre: string): Promise<string | null> {
    if (!API_KEY) return null;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{
                    role: 'user',
                    content: `Write a 2-sentence exciting pitch for "${title}" (${genre}). Make it compelling!`
                }],
                temperature: 0.8,
                max_tokens: 100
            })
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content || null;

    } catch (error) {
        console.error('DeepSeek description error:', error);
        return null;
    }
}

/**
 * Convert File to base64
 */
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                // Remove data URL prefix (data:image/jpeg;base64,...)
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            } else {
                reject(new Error('Failed to convert file to base64'));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
