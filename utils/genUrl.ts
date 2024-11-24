"use server"
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { RekognitionClient, DetectModerationLabelsCommand } from "@aws-sdk/client-rekognition";
import { revalidatePath } from "next/cache";

// Types
type PresignedUrlResponse = {
    uploadUrl: string;
    key: string;
    error?: never;
} | {
    error: string;
    uploadUrl?: never;
    key?: never;
};

type ModerationResponse = {
    results: any;
    error?: never;
} | {
    error: string;
    results?: never;
};

// Initialize AWS clients
const s3Client = new S3Client({
    region: process.env.AWS_REGION1 || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY1!,
        secretAccessKey: process.env.AWS_SECRET_KEY1!
    }
});

const rekognitionClient = new RekognitionClient({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY1!,
        secretAccessKey: process.env.AWS_SECRET_KEY1!
    }
});

// Generate a unique file key
const generateUniqueFileKey = (filename: string) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = filename.split('.').pop();
    return `uploads/${timestamp}-${randomString}.${extension}`;
};

// Get presigned URL for upload
export async function getPresignedUrl(filename: string): Promise<PresignedUrlResponse> {
    "use server"

    try {
        const key = generateUniqueFileKey(filename);
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: key,
            ContentType: `image/${filename.split('.').pop()}`,
        });

        const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        return {
            uploadUrl,
            key
        };
    } catch (error) {
        console.error('Error generating presigned URL:', error);
        return {
            error: 'Failed to generate upload URL'
        };
    }
}

// Get presigned URL for viewing/downloading
export async function getViewPresignedUrl(key: string): Promise<PresignedUrlResponse> {
    "use server"

    try {
        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: key,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        return {
            uploadUrl: url,
            key
        };
    } catch (error) {
        console.error('Error generating view URL:', error);
        return {
            error: 'Failed to generate view URL'
        };
    }
}

// Check content moderation
export async function checkModeration(key: string): Promise<ModerationResponse> {
    "use server"

    try {
        const command = new DetectModerationLabelsCommand({
            Image: {
                S3Object: {
                    Bucket: process.env.S3_BUCKET_NAME!,
                    Name: key
                }
            },
            MinConfidence: 40
        });

        const response = await rekognitionClient.send(command);

        // Optionally revalidate the path if you're showing results on the page
        revalidatePath('/your-page-path');

        return {
            results: response.ModerationLabels
        };
    } catch (error) {
        console.error('Error checking moderation:', error);
        return {
            error: 'Failed to check content moderation'
        };
    }
}
