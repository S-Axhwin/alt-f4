"use client"

import React, { useState } from 'react';
import {
    User,
    Settings,
    Bell,
    Shield,
    CreditCard,
    Lock,
    LogOut
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { signOutAction } from '@/app/actions';
import Link from 'next/link';

export default function SettingsPage() {
    const [profileData, setProfileData] = useState({
        username: "JohnDoe",
        email: "john.doe@example.com",
        name: "John Doe"
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        pushNotifications: false,
        moderationAlerts: true
    });

    const [securitySettings, setSecuritySettings] = useState({
        twoFactorAuth: false
    });

    const handleProfileUpdate = (e: any) => {
        e.preventDefault();
        console.log("Profile Updated", profileData);
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container max-w-4xl mx-auto"
            >
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center">
                    <Settings className="mr-2 w-6 h-6 sm:w-auto sm:h-auto" /> Account Settings
                </h1>

                {/* Profile Settings */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                >
                    <Card className="mb-4 sm:mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center text-base sm:text-lg">
                                <User className="mr-2 w-4 h-4 sm:w-auto sm:h-auto" /> Profile Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleProfileUpdate} className="space-y-3 sm:space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <Label className="text-sm">Username</Label>
                                        <Input
                                            className="text-sm"
                                            value={profileData.username}
                                            onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm">Full Name</Label>
                                        <Input
                                            className="text-sm"
                                            value={profileData.name}
                                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm">Email</Label>
                                    <Input
                                        type="email"
                                        className="text-sm"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    />
                                </div>
                                <Button size="sm" type="submit">Update Profile</Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Notification Settings */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        ...sectionVariants,
                        visible: {
                            ...sectionVariants.visible,
                            transition: {
                                ...sectionVariants.visible.transition,
                                delay: 0.2
                            }
                        }
                    }}
                >
                    <Card className="mb-4 sm:mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center text-base sm:text-lg">
                                <Bell className="mr-2 w-4 h-4 sm:w-auto sm:h-auto" /> Notification Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm">Email Notifications</Label>
                                    <Switch
                                        checked={notifications.emailNotifications}
                                        onCheckedChange={(checked) => setNotifications({
                                            ...notifications,
                                            emailNotifications: checked
                                        })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm">Push Notifications</Label>
                                    <Switch
                                        checked={notifications.pushNotifications}
                                        onCheckedChange={(checked) => setNotifications({
                                            ...notifications,
                                            pushNotifications: checked
                                        })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm">Moderation Alerts</Label>
                                    <Switch
                                        checked={notifications.moderationAlerts}
                                        onCheckedChange={(checked) => setNotifications({
                                            ...notifications,
                                            moderationAlerts: checked
                                        })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Security Settings */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        ...sectionVariants,
                        visible: {
                            ...sectionVariants.visible,
                            transition: {
                                ...sectionVariants.visible.transition,
                                delay: 0.4
                            }
                        }
                    }}
                >
                    <Card className="mb-4 sm:mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center text-base sm:text-lg">
                                <Shield className="mr-2 w-4 h-4 sm:w-auto sm:h-auto" /> Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm">Two-Factor Authentication</Label>
                                    <Switch
                                        checked={securitySettings.twoFactorAuth}
                                        onCheckedChange={(checked) => setSecuritySettings({
                                            ...securitySettings,
                                            twoFactorAuth: checked
                                        })}
                                    />
                                </div>
                                <Button size="sm" variant="destructive" className="mt-2 sm:mt-4">
                                    <Lock className="mr-2 w-4 h-4 sm:w-auto sm:h-auto" /> Change Password
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Subscription & Billing */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        ...sectionVariants,
                        visible: {
                            ...sectionVariants.visible,
                            transition: {
                                ...sectionVariants.visible.transition,
                                delay: 0.6
                            }
                        }
                    }}
                >
                    <Card className="mb-4 sm:mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center text-base sm:text-lg">
                                <CreditCard className="mr-2 w-4 h-4 sm:w-auto sm:h-auto" /> Subscription
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                                <div className="text-sm">
                                    <p>Current Plan: Trial</p>
                                    <p className="text-muted-foreground">0/month</p>
                                </div>
                                <Link href="/about" className="w-full sm:w-auto">
                                    <Button size="sm" className="w-full sm:w-auto">Manage Subscription</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Logout */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        ...sectionVariants,
                        visible: {
                            ...sectionVariants.visible,
                            transition: {
                                ...sectionVariants.visible.transition,
                                delay: 0.8
                            }
                        }
                    }}
                    className="flex justify-end"
                >
                    <Button
                        size="sm"
                        onClick={signOutAction}
                        variant="destructive"
                        className='bg-transparent border-destructive/35 border-2'
                    >
                        <LogOut className="mr-2 w-4 h-4 sm:w-auto sm:h-auto" /> Logout
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
