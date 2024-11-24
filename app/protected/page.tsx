// @ts-nocheck
"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Upload, Settings, Clock } from "lucide-react";

import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

const WelcomePage = () => {
    const supabase = createClient();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, [supabase]);

    // Get user's first name (if available) or username
    const userName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there';

    const quickActions = [
        { title: 'Upload Files', icon: Upload, href: '/protected/upload' },
        { title: 'Recent Activity', icon: Activity, href: '/activity' },
        { title: 'Settings', icon: Settings, href: '/settings' },
    ];

    const recentActivities = [
        { action: 'File uploaded', time: '2 hours ago' },
        { action: 'Profile updated', time: '1 day ago' },
        { action: 'Settings changed', time: '3 days ago' },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}! 👋</h1>
                <p className="text-muted-foreground">
                    Here's what's been happening in your workspace
                </p>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-3">
                {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Card key={action.title} className="cursor-pointer hover:bg-accent/50 transition-colors">
                            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{action.title}</CardTitle>
                                <Icon className="w-4 h-4 ml-auto text-muted-foreground" />
                            </CardHeader>
                            <CardContent>

                                    <Button variant="ghost" className="p-0 h-auto">
                                        Get Started →
                                    </Button>
                                
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest actions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default WelcomePage;
