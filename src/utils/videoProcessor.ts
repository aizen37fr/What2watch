/**
 * Video Processing Utilities
 * Extracts frames from video files for AI analysis
 */

export interface VideoFrame {
    blob: Blob;
    timestamp: number;
    dataUrl: string;
}

/**
 * Extract frames from a video file at specified intervals
 */
export async function extractVideoFrames(
    videoFile: File,
    intervalSeconds: number = 2,
    maxFrames: number = 10
): Promise<VideoFrame[]> {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
        }

        video.preload = 'metadata';
        video.src = URL.createObjectURL(videoFile);

        video.onloadedmetadata = async () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const frames: VideoFrame[] = [];
            const duration = Math.min(video.duration, maxFrames * intervalSeconds);

            try {
                for (let time = 0; time < duration && frames.length < maxFrames; time += intervalSeconds) {
                    const frame = await captureFrame(video, canvas, ctx, time);
                    frames.push(frame);
                }

                URL.revokeObjectURL(video.src);
                resolve(frames);
            } catch (error) {
                URL.revokeObjectURL(video.src);
                reject(error);
            }
        };

        video.onerror = () => {
            URL.revokeObjectURL(video.src);
            reject(new Error('Failed to load video'));
        };
    });
}

/**
 * Capture a single frame at a specific timestamp
 */
async function captureFrame(
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    timestamp: number
): Promise<VideoFrame> {
    return new Promise((resolve, reject) => {
        const seekHandler = () => {
            try {
                // Draw current frame to canvas
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Convert to blob
                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Failed to create blob'));
                        return;
                    }

                    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

                    resolve({
                        blob,
                        timestamp,
                        dataUrl
                    });
                }, 'image/jpeg', 0.9);

                video.removeEventListener('seeked', seekHandler);
            } catch (error) {
                reject(error);
            }
        };

        video.addEventListener('seeked', seekHandler);
        video.currentTime = timestamp;
    });
}

/**
 * Get video file metadata
 */
export async function getVideoMetadata(videoFile: File): Promise<{
    duration: number;
    width: number;
    height: number;
}> {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = URL.createObjectURL(videoFile);

        video.onloadedmetadata = () => {
            const metadata = {
                duration: video.duration,
                width: video.videoWidth,
                height: video.videoHeight
            };
            URL.revokeObjectURL(video.src);
            resolve(metadata);
        };

        video.onerror = () => {
            URL.revokeObjectURL(video.src);
            reject(new Error('Failed to load video metadata'));
        };
    });
}

/**
 * Check if file is a video
 */
export function isVideoFile(file: File): boolean {
    return file.type.startsWith('video/');
}

/**
 * Check if file is an image
 */
export function isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
}

/**
 * Get file type category
 */
export function getFileType(file: File): 'video' | 'image' | 'unknown' {
    if (isVideoFile(file)) return 'video';
    if (isImageFile(file)) return 'image';
    return 'unknown';
}
