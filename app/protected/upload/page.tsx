// @ts-nocheck
"use client"
import React from 'react';
import { useToast } from "@/hooks/use-toast"
import { Upload, Shield, AlertTriangle, Check, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getPresignedUrl, checkModeration } from '@/utils/genUrl';
import { createClient } from '@/utils/supabase/client';

export default function UploadPage() {
    const [file, setFile] = React.useState(null);
    const { toast } = useToast()
    const [uploading, setUploading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [uploadStatus, setUploadStatus] = React.useState('');
    const [moderationResults, setModerationResults] = React.useState(null);
    const [error, setError] = React.useState('');
    const fileInputRef = React.useRef(null);

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.type.startsWith('image/')) {
                setFile(selectedFile);
                setError('');
                setModerationResults(null);
            } else {
                setError('Please select an image file');
                setFile(null);
            }
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        const supabase = createClient();
        const { data, error } = await supabase
            .from("images")
            .select("*")

        if (data?.length > 5) {
            toast({
                title: "Limit reached",
                description: "try contacting Developer👽",
            })
            return 0;
        }
        try {
            setUploading(true);
            setProgress(0);
            setError('');

            // Get presigned URL
            const { uploadUrl, key, error: urlError } = await getPresignedUrl(file.name);
            if (urlError) throw new Error(urlError);

            // Upload with progress
            const xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    setProgress(percentComplete);
                }
            });

            await new Promise((resolve, reject) => {
                xhr.open('PUT', uploadUrl);
                xhr.setRequestHeader('Content-Type', file.type);

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve();
                    } else {
                        reject(new Error('Upload failed'));
                    }
                };

                xhr.onerror = () => reject(new Error('Upload failed'));
                xhr.send(file);
            });

            setUploadStatus('success');
            setProgress(100);

            // Check moderation
            const moderation = await checkModeration(key);
            if (moderation.error) throw new Error(moderation.error);

            setModerationResults(moderation.results);
            const supabase = createClient();
            const { data, error } = await supabase
                .from("images")
                .insert({ url: key, status: "done", result: moderation.results })
                .select("*")
            console.log(data, error);

        } catch (err) {
            setError(err.message);
            setUploadStatus('error');
        } finally {
            setUploading(false);
        }
    };

    const resetUpload = () => {
        setFile(null);
        setProgress(0);
        setUploadStatus('');
        setModerationResults(null);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div className="mx-auto max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="h-6 w-6" />
                            Image Upload & Moderation
                        </CardTitle>
                        <CardDescription>
                            Upload an image to check it for inappropriate content
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="image/*"
                                className="hidden"
                                id="file-upload"
                            />

                            <div className="grid w-full place-items-center gap-1.5">
                                <div className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12">
                                    <div className="flex flex-col items-center justify-center text-center">
                                        {!file ? (
                                            <>
                                                <Upload className="h-8 w-8 text-gray-400" />
                                                <label
                                                    htmlFor="file-upload"
                                                    className="mt-2 cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-500"
                                                >
                                                    Choose a file
                                                </label>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    or drag and drop
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <Check className="h-8 w-8 text-green-500" />
                                                <p className="mt-2 text-sm font-medium">{file.name}</p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {(uploading || progress > 0) && (
                                <div className="space-y-2">
                                    <Progress value={progress} />
                                    <p className="text-center text-sm text-gray-500">
                                        {progress.toFixed(0)}% uploaded
                                    </p>
                                </div>
                            )}
                        </div>

                        {moderationResults !== null && (
                            <div className="space-y-2 rounded-lg border p-4">
                                <div className="flex items-center gap-2">
                                    {moderationResults.length > 0 ? (
                                        <>
                                            <Shield className="h-5 w-5 text-orange-500" />
                                            <h3 className="font-medium">Moderation Results</h3>
                                        </>
                                    ) : (
                                        <>
                                            <Check className="h-5 w-5 text-green-500" />
                                            <h3 className="font-medium text-green-700">Content Approved</h3>
                                        </>
                                    )}
                                </div>
                                {moderationResults.length > 0 ? (
                                    <ScrollArea className="h-48">
                                        {moderationResults.map((label, index) => (
                                            <div key={index} className="space-y-1 py-2">
                                                <div className="flex justify-between">
                                                    <span className="font-medium">{label.Name}</span>
                                                    <span className="text-sm text-gray-500">
                                                        {label.Confidence.toFixed(2)}% confidence
                                                    </span>
                                                </div>
                                                <Separator />
                                            </div>
                                        ))}
                                    </ScrollArea>
                                ) : (
                                    <div className="py-2 text-green-600">
                                        <p>Your content has passed our moderation check. You're good to go! 👍</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={resetUpload}
                            disabled={!file || uploading}
                        >
                            <X className="mr-2 h-4 w-4" />
                            Reset
                        </Button>
                        <Button
                            className='text-white font-bold'
                            onClick={handleUpload}
                            disabled={!file || uploading}
                        >
                            {uploading ? (
                                <>Uploading...</>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
