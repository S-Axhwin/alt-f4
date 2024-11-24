// app/about/page.tsx
"use client"

import React from 'react';
import { Shield, Code, Layout, Database, Zap, Github, Linkedin, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: {
        y: 20,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
};

// Wrap Card with motion
const MotionCard = motion(Card);

// Team members data
const teamMembers = [
    {
        name: "Ashwin",
        role: "Full Stack Developer",
        description: "Leads the development of both frontend and backend systems, integrating AI services and managing database architecture.",
        icon: <Code className="w-6 h-6" />,
        responsibilities: ["API Integration", "Database Design", "Authentication", "Backend Services"]
    },
    {
        name: "Yugha",
        role: "Frontend Developer",
        description: "Crafts responsive and intuitive user interfaces, implementing real-time upload feedback and moderation results display.",
        icon: <Layout className="w-6 h-6" />,
        responsibilities: ["User Interface", "Responsive Design", "State Management", "Performance Optimization"]
    },
    {
        name: "Udit",
        role: "UI/UX Developer",
        description: "Designs user-friendly interfaces and experiences, ensuring smooth content moderation workflows and clear result visualization.",
        icon: <Zap className="w-6 h-6" />,
        responsibilities: ["User Experience", "Interface Design", "Interaction Flows", "Visual Design"]
    },
    {
        name: "Arshia",
        role: "System Design",
        description: "Architects the overall system structure, ensuring scalability and efficient processing of image moderation requests.",
        icon: <Database className="w-6 h-6" />,
        responsibilities: ["System Architecture", "Scalability", "Performance", "Technical Documentation"]
    }
];

// Tech stack data
const techStack = [
    {
        title: "Frontend",
        description: "Next.js, React"
    },
    {
        title: "Backend",
        description: "Supabase"
    },
    {
        title: "AI Services",
        description: "AWS Rekognition"
    },
    {
        title: "Storage",
        description: "Supabase Storage"
    }
];

// Social links data
const socialLinks = [
    {
        icon: <Github className="h-5 w-5" />,
        href: "http://github.com/S-Axhwin",
        label: "GitHub"
    },
    {
        icon: <Linkedin className="h-5 w-5" />,
        href: "https://www.linkedin.com/in/ashwinsathiya/",
        label: "LinkedIn"
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <motion.div
                className="border-b"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="container flex flex-col items-center justify-center space-y-4 py-16 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <Shield className="h-16 w-16 text-primary" />
                    </motion.div>
                    <motion.h1
                        className="text-4xl font-bold tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        AI-Powered Image Moderation
                    </motion.h1>
                    <motion.p
                        className="text-xl text-muted-foreground max-w-3xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Building a safer digital environment through intelligent content analysis
                    </motion.p>
                </div>
            </motion.div>

            {/* Mission Section */}
            <motion.div
                className="container py-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MotionCard
                        className="bg-card"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "tween" }}
                    >
                        <CardHeader>
                            <CardTitle>Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-card-foreground">
                                To create a powerful, accessible tool that helps platforms maintain safe
                                and respectful online environments through advanced AI-based image
                                recognition technology.
                            </p>
                        </CardContent>
                    </MotionCard>

                    <MotionCard
                        className="bg-card"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "tween" }}
                    >
                        <CardHeader>
                            <CardTitle>Key Features</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-card-foreground">
                                <li>• Real-time image content analysis</li>
                                <li>• Multiple content detection categories</li>
                                <li>• Automated flagging system</li>
                                <li>• User-friendly moderation interface</li>
                            </ul>
                        </CardContent>
                    </MotionCard>
                </div>
            </motion.div>

            {/* Team Section */}
            <motion.div
                className="container py-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.h2
                    className="text-3xl font-bold text-center mb-12"
                    variants={itemVariants}
                >
                    Our Team
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, index) => (
                        <MotionCard
                            key={index}
                            className="bg-card"
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                        >
                            <CardHeader>
                                <motion.div
                                    className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {React.cloneElement(member.icon, {
                                        className: "w-6 h-6 text-primary"
                                    })}
                                </motion.div>
                                <CardTitle>{member.name}</CardTitle>
                                <CardDescription>{member.role}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-card-foreground mb-4">
                                    {member.description}
                                </p>
                                <div className="space-y-1">
                                    {member.responsibilities.map((resp, idx) => (
                                        <div key={idx} className="text-xs text-muted-foreground">
                                            • {resp}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </MotionCard>
                    ))}
                </div>
            </motion.div>

            {/* Technology Stack */}
            <motion.div
                className="border-t"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="container py-12">
                    <motion.h2
                        className="text-3xl font-bold text-center mb-8"
                        variants={itemVariants}
                    >
                        Technology Stack
                    </motion.h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {techStack.map((tech, index) => (
                            <MotionCard
                                key={index}
                                className="bg-card"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <CardHeader>
                                    <CardTitle className="text-base">{tech.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                                </CardContent>
                            </MotionCard>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
                className="border-t"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="container py-12 text-center">
                    <motion.h2
                        className="text-3xl font-bold mb-8"
                        variants={itemVariants}
                    >
                        Get in Touch
                    </motion.h2>
                    <motion.div
                        className="flex justify-center space-x-4"
                        variants={itemVariants}
                    >
                        {socialLinks.map((social, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    asChild
                                >
                                    <a href={social.href} aria-label={social.label}>
                                        {social.icon}
                                    </a>
                                </Button>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
