// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import { Shield, Image, Upload, Check, ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const floatingAnimation = {
    y: ["-10%", "10%"],
    transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
    }
};

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <motion.div
            ref={heroRef}
            className="relative min-h-screen"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                {/* Floating shapes */}
                <AnimatePresence>
                    {isVisible && (
                        <>
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full bg-primary/5"
                                    style={{
                                        width: Math.random() * 100 + 50,
                                        height: Math.random() * 100 + 50,
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                    }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: 1,
                                        opacity: 0.3,
                                        y: ["-20px", "20px"],
                                        x: ["-20px", "20px"],
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut",
                                        delay: i * 0.2,
                                    }}
                                />
                            ))}
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Main content */}
            <motion.div
                className="relative container px-4 py-24 mx-auto"
                style={{ y, opacity }}
            >
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Animated icon */}
                    <motion.div
                        className="flex justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <motion.div
                            className="p-3 rounded-full bg-primary/10 relative"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Shield className="w-10 h-10 text-primary" />
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-primary/30"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Heading with typing effect */}
                    <motion.h1
                        className="text-4xl sm:text-6xl font-bold tracking-tight"
                        variants={itemVariants}
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            Safe Content Management
                        </motion.span>
                        <br />
                        <motion.span
                            className="text-primary inline-block"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                        >
                            Made Simple
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                        variants={itemVariants}
                    >
                        Protect your platform with our advanced AI-powered image moderation system.
                        Upload, analyze, and manage content with confidence.
                    </motion.p>

                    {/* Animated buttons */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-4"
                        variants={itemVariants}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button size="lg" className="group" asChild>
                                <Link href="/login">
                                    Get Started
                                    <motion.div
                                        className="ml-2"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    >
                                        <ArrowRight className="h-4 w-4" />
                                    </motion.div>
                                </Link>
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/about">Learn More</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Features grid with hover effects */}
                <motion.div
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                    variants={containerVariants}
                >
                    {[
                        { icon: Upload, title: "Easy Upload", description: "Drag and drop or click to upload images securely" },
                        { icon: Image, title: "Smart Analysis", description: "Advanced AI analyzes content for safety" },
                        { icon: Check, title: "Instant Results", description: "Get immediate feedback and reports" }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center text-center p-6 rounded-lg bg-card relative overflow-hidden group"
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                                initial={false}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <motion.div animate={floatingAnimation}>
                                <feature.icon className="w-12 h-12 text-primary mb-4" />
                            </motion.div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                            <motion.div
                                className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/10"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Floating sparkles effect */}
                <AnimatePresence>
                    {isVisible && (
                        <motion.div className="absolute inset-0 pointer-events-none">
                            {[...Array(15)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0],
                                        y: [0, -20, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 2,
                                    }}
                                >
                                    <Sparkles className="w-3 h-3 text-primary/30" />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default Hero;
