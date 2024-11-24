"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Upload, Settings, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';

const WelcomePage = () => {
    const supabase = createClient();
    const [user, setUser] = useState(null as any);
    const [recentActivities, setRecentActivities] = useState([] as any);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, [supabase]);

    const userName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there';

    const quickActions = [
        { title: 'Upload Files', icon: Upload, href: '/protected/upload' },
        { title: 'Recent Activity', icon: Activity, href: '/protected/history' },
        { title: 'Settings', icon: Settings, href: '/settings' },
    ];

    useEffect(() => {
        const fetchRecentActivities = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('images')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5); // Only fetch last 5 activities

            if (error) {
                console.error('Error fetching recent activities:', error);
                return;
            }

            setRecentActivities(data || []);
            setIsLoading(false);
        };

        fetchRecentActivities();
    }, [supabase]);

    const getStatusBadge = (result: any) => {
        if (result.length === 0) {
            return (
                <Badge variant="default" className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Safe
                </Badge>
            );
        } else {
            return (
                <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Flagged
                </Badge>
            );
        }
    };

    const getDetectionSummary = (result: any) => {
        if (!result || result.length === 0) return "No issues detected";

        // Get unique level 1 detections
        const uniqueDetections = Array.from(new Set(
            result
                .filter((r: { TaxonomyLevel: number }) => r.TaxonomyLevel === 1)
                .map((r: { Name: string }) => r.Name)
        ));

        return uniqueDetections.join(", ") || "Processing complete";
    };

    return (
        <div className="px-8 py-8 max-w-[1400px] mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {userName}! 👋</h1>
                <p className="text-muted-foreground">
                    Here's what's been happening in your workspace
                </p>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-8 md:grid-cols-3 mb-8">
                {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Link href={action.href} key={action.title} className="block">
                            <Card className="hover:bg-accent/50 transition-all duration-300 h-full p-2">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-base font-medium">{action.title}</CardTitle>
                                    <Icon className="w-4 h-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <Button
                                        variant="ghost"
                                        className="p-2 h-auto hover:translate-x-1 transition-transform hover:bg-transparent"
                                    >
                                        Get Started →
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <Card className="w-full">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Your latest moderation results</CardDescription>
                        </div>
                        <Link href="/protected/history">
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center space-x-4 animate-pulse">
                                    <div className="w-12 h-12 bg-muted rounded" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 bg-muted rounded w-1/4" />
                                        <div className="h-3 bg-muted rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : recentActivities.length > 0 ? (
                        <div className="space-y-4">
                            {recentActivities.map((activity: any) => (
                                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                        <img
                                            src={`https://image-reco.s3.ap-southeast-2.amazonaws.com/${activity.url}`}
                                            alt="Uploaded content"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium">
                                                {activity.url.split('/').pop()}
                                            </p>
                                            {getStatusBadge(activity.result)}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {getDetectionSummary(activity.result)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No recent activity found</p>
                            <Link href="/protected/upload">
                                <Button variant="outline" className="mt-4">
                                    Upload Your First Image
                                </Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default WelcomePage;
