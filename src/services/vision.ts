// Service to handle Video/Image analysis

export interface VisionResult {
    found: boolean;
    title?: string;
    year?: number;
    confidence?: number;
    timestamp?: string;
    image?: string; // The frame that was analyzed
    reasoning?: string;
}

/**
 * Extracts a frame from a video file at a random timestamp (or 20% mark)
 */
export async function extractFrameFromVideo(videoFile: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = URL.createObjectURL(videoFile);
        video.muted = true;
        video.playsInline = true;

        video.onloadedmetadata = () => {
            // Seek to 20% of video or 5 seconds, whichever is less, to avoid black frames at start
            let seekTime = Math.min(video.duration * 0.2, 5);
            if (video.duration > 10) seekTime = 5;
            video.currentTime = seekTime;
        };

        video.onseeked = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/jpeg', 0.8));
                } else {
                    reject(new Error('Canvas context failed'));
                }
            } catch (e) {
                reject(e);
            } finally {
                URL.revokeObjectURL(video.src);
            }
        };

        video.onerror = () => {
            reject(new Error('Video load failed'));
            URL.revokeObjectURL(video.src);
        };
    });
}

/**
 * Simulates analyzing an image to find a movie.
 * In a real/production app, this would call OpenAI Vision or Gemini Vision API.
 */
export async function identifyMovie(imageBase64: string): Promise<VisionResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // For demo purposes, we randomly succeed or fail
    // In a real integration, we'd send `imageBase64` to an API

    const isSuccess = Math.random() > 0.3; // 70% success rate for demo

    if (isSuccess) {
        return {
            found: true,
            title: "Inception",
            year: 2010,
            confidence: 94,
            timestamp: "00:42:15",
            reasoning: "Visual matches characteristic spinning top scene and lighting palette of Christopher Nolan's Inception.",
            image: imageBase64
        };
    } else {
        return {
            found: false,
            image: imageBase64,
            reasoning: "Could not identify with high confidence. Scene is too dark or generic."
        };
    }
}
