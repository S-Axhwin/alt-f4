import Hero from "@/components/hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Zap, Users } from "lucide-react";

export default function Index() {
    const stats = [
        { label: "Active Users", value: "100+", icon: Users },
        { label: "Images Processed", value: "100+", icon: Zap },
        { label: "Success Rate", value: "95%", icon: Shield },
        { label: "Data Protected", value: "100%", icon: Lock },
    ];

    return (
        <>
            <Hero />
            <main className="container px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.label}
                                    </CardTitle>
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* How It Works Section */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-muted-foreground mb-12">
                        Our platform makes content moderation simple and efficient
                    </p>

                    <div className="grid gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>1. Upload Your Content</CardTitle>
                                <CardDescription>
                                    Simply drag and drop your images or click to upload. We support all major image formats.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>2. Automatic Analysis</CardTitle>
                                <CardDescription>
                                    Our AI-powered system instantly analyzes your content for potential issues.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>3. Review Results</CardTitle>
                                <CardDescription>
                                    Get detailed reports and take appropriate action based on the analysis.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>

                {/* Trust & Security Section */}
                <div className="bg-card rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        Trusted by Companies Worldwide
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Our platform helps businesses maintain safe and respectful online environments.
                        Join thousands of companies who trust us with their content moderation needs.
                    </p>
                </div>
            </main>
        </>
    );
}
