// app/history/loading.tsx
"use client";

import { Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

const LoadingPage = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random increment between 5 and 15
                const increment = Math.floor(Math.random() * 10) + 5;
                return Math.min(prev + increment, 100);
            });
        }, 400);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            {/* Shield Icon with pulse animation */}
            <div className="relative mb-8">
                <Shield className="w-16 h-16 text-primary animate-pulse" />
                <div className="absolute inset-0 rounded-full animate-ping-slow bg-primary/20" />
            </div>

            {/* Progress Bar */}
            <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden mb-4">
                <div
                    className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Progress Text */}
            <div className="text-lg font-medium text-foreground/80 mb-2 flex items-center gap-2">
                <span>Loading your moderation history</span>
                <span className="text-sm text-muted-foreground">({progress}%)</span>
            </div>
            <div className="text-sm text-muted-foreground">
                {progress < 30 && "Initializing..."}
                {progress >= 30 && progress < 60 && "Fetching your data..."}
                {progress >= 60 && progress < 90 && "Processing results..."}
                {progress >= 90 && "Almost done..."}
            </div>

            {/* Skeleton Cards */}
            <div className="container max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`bg-card rounded-lg overflow-hidden border animate-pulse
                            ${progress > (i * 15) ? 'opacity-100' : 'opacity-40'}`}
                        style={{
                            transition: 'opacity 0.3s ease-out',
                            transitionDelay: `${i * 100}ms`
                        }}
                    >
                        {/* Skeleton Image */}
                        <div className="aspect-video bg-muted" />

                        {/* Skeleton Content */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="h-4 bg-muted rounded w-32" />
                                <div className="h-4 bg-muted rounded w-20" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="h-3 bg-muted rounded w-24" />
                                    <div className="h-3 bg-muted rounded w-24" />
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-3 bg-muted rounded w-16" />
                                    <div className="h-3 bg-muted rounded w-16" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingPage;
