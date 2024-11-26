"use client"

import React from 'react';
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Shield, Code, Layout, Database, Zap, Github, Linkedin, Mail, LinkedinIcon, X, } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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

const MotionCard = motion(Card);

const teamMembers = [

    {
        name: "Yugha",
        role: "Frontend Developer",
        description: "Crafts responsive and intuitive user interfaces, implementing real-time upload feedback and moderation results display.",
        icon: <Layout className="w-6 h-6" />,
        responsibilities: ["User Interface", "Responsive Design", "State Management", "Performance Optimization"],
        linkedInUrl: "https://www.linkedin.com/in/yugha-s-606768293/"
    },
    {
        name: "Ashwin Sathiya",
        role: "Full Stack Developer",
        description: "Leads the development of both frontend and backend systems, integrating AI services and managing database architecture.",
        icon: <Code className="w-6 h-6" />,
        responsibilities: ["API Integration", "Database Design", "Authentication", "Backend Services"],
        linkedInUrl: "https://www.linkedin.com/in/ashwinsathiya/"
    },
    {
        name: "Udit",
        role: "UI/UX Developer",
        description: "Designs user-friendly interfaces and experiences, ensuring smooth content moderation workflows and clear result visualization.",
        icon: <Zap className="w-6 h-6" />,
        responsibilities: ["User Experience", "Interface Design", "Interaction Flows", "Visual Design"],
        linkedInUrl: "https://www.linkedin.com/in/udit1105/"

    },
    {
        name: "Arshia",
        role: "System Design",
        description: "Architects the overall system structure, ensuring scalability and efficient processing of image moderation requests.",
        icon: <Database className="w-6 h-6" />,
        responsibilities: ["System Architecture", "Scalability", "Performance", "Technical Documentation"],
        linkedInUrl: "https://www.linkedin.com/in/arshia05/"
    }
];

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

const socialLinks = [
    {
        icon: <FaGithub />,
        href: "http://github.com/S-Axhwin",
        label: "GitHub"
    },
    {
        icon: <FaLinkedin />,
        href: "https://www.linkedin.com/in/ashwinsathiya/",
        label: "LinkedIn"
    },
    {
        icon: <FaXTwitter />,
        href: "https://x.com/sathiya_ashwin",
        label: "x.com"
    }
];


const pricingPlans = [
    {
        title: "Trial Plan",
        price: "Free",
        originalPrice: null,
        features: [
            "Upload up to 5 images",
            "Basic image moderation",
            "Limited AI analysis"
        ],
        buttonText: "Current Plan"
    },
    {
        title: "Basic Plan",
        price: "₹299/month",
        originalPrice: "₹399",
        features: [
            "10 images per day",
            "Standard image moderation",
            "Detailed content analysis",
            "Basic support"
        ],
        buttonText: "Choose Basic"
    },
    {
        title: "Pro Plan",
        price: "₹499/month",
        originalPrice: "₹599",
        features: [
            "100 images per day",
            "Advanced AI moderation",
            "Comprehensive content insights",
            "Priority support"
        ],
        buttonText: "Choose Pro"
    }
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
                className="container py-8 md:px-28"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-pretty">
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

            {/* Pricing */}
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
                        Pricing
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <MotionCard
                                key={index}
                                className={`bg-card ${index === 1 ? 'border-2 border-primary' : ''}`}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <CardHeader>
                                    <CardTitle className="text-xl">{plan.title}</CardTitle>
                                    <CardDescription className="text-2xl font-bold text-foreground">
                                        {plan.price}
                                        {plan.originalPrice && (
                                            <span className="ml-2 text-sm line-through text-muted-foreground">
                                                {plan.originalPrice}
                                            </span>
                                        )}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className="flex items-center gap-2 text-muted-foreground"
                                            >
                                                <span className="w-2 h-2 bg-primary rounded-full" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        variant={index === 0 ? "outline" : index === 1 ? "default" : "secondary"}
                                        className="w-full"
                                    >
                                        {plan.buttonText}
                                    </Button>
                                </CardContent>
                            </MotionCard>
                        ))}
                    </div>
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
                            className="bg-card/50 backdrop-blur-sm border border-border/50"
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                        >
                            <CardHeader className="bg-background/50 border-b border-border/10">
                                <motion.div
                                    className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {React.cloneElement(member.icon, {
                                        className: "w-6 h-6 text-primary"
                                    })}
                                </motion.div>
                                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
                                    {member.name}
                                    <Link href={member.linkedInUrl}>
                                        <LinkedinIcon
                                            size={20}
                                            className="text-muted-foreground hover:text-blue-600 cursor-pointer transition-colors duration-200"
                                        />
                                    </Link>
                                </CardTitle>
                                <CardDescription className="text-sm font-medium text-muted-foreground/80">
                                    {member.role}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6 bg-card">
                                <p className="text-sm text-card-foreground/90 mb-6 leading-relaxed">
                                    {member.description}
                                </p>
                                <div className="space-y-2">
                                    {member.responsibilities.map((resp, idx) => (
                                        <div
                                            key={idx}
                                            className="text-xs text-muted-foreground/70 flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                            {resp}
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
