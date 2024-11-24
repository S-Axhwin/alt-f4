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

    const userName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there';

    const quickActions = [
        { title: 'Upload Files', icon: Upload, href: '/protected/upload' },
        { title: 'Recent Activity', icon: Activity, href: '/protected/history' },
        { title: 'Settings', icon: Settings, href: '/settings' },
    ];

    const recentActivities = [
        { action: 'File uploaded', time: '2 hours ago' },
        { action: 'Profile updated', time: '1 day ago' },
        { action: 'Settings changed', time: '3 days ago' },
    ];

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
            <Card className="w-full p-2">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest actions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-center">
                                <Clock className="w-4 h-4 mr-3 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">{activity.action}</p>
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
