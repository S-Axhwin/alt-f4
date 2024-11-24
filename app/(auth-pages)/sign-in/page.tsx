// app/login/page.tsx
"use client"

import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from '@/utils/supabase/client';
import { Chrome } from "lucide-react";
import { useRouter } from 'next/navigation';

const SignInPage = () => {
    const router = useRouter();
    const supabase = createClient();

    const handleGoogleSignIn = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
                    <CardDescription>
                        Sign in with Google to continue
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form action={handleGoogleSignIn}>
                        <Button
                            type="submit"
                            variant="outline"
                            className="w-full"
                        >
                            <Chrome className="mr-2 h-4 w-4" />
                            Sign in with Google
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-wrap items-center justify-center gap-2">
                    <div className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <Button variant="link" className="p-0" onClick={() => router.push('/register')}>
                            Sign up
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignInPage;
