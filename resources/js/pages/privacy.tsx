import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function Privacy() {
    return (
        <PublicLayout>
            <Head title="Privacy Policy - Venture Builders" />

            {/* 1. Header Banner */}
            <section className="bg-zinc-900 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80')" }} 
                />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
                    <span className="text-orange-500 font-extrabold text-sm uppercase tracking-wider">Compliance</span>
                    <h1 className="text-4xl font-black tracking-tight">Privacy Policy</h1>
                    <p className="text-zinc-400 max-w-xl mx-auto text-xs sm:text-sm">
                        Please read how we protect and manage your personal coordinates when submitting listing leads.
                    </p>
                </div>
            </section>

            {/* 2. Content */}
            <section className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                    <div className="flex gap-3 items-center pb-4 border-b border-zinc-150 dark:border-zinc-900">
                        <ShieldCheck className="w-8 h-8 text-orange-600 shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Your Data Security is Our Commitment</h2>
                            <p className="text-xs text-zinc-500">Last updated: June 2026</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">1. Information We Collect</h3>
                        <p>
                            We collect personal information that you provide voluntarily when submitting contact requests, subscribing to our newsletters, or filling out tour request forms. This information may include your name, email address, phone number, and custom message details.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">2. How We Use Your Details</h3>
                        <p>
                            We use the collected information exclusively to process your property inquiries, schedule physical estate tours, answer technical building queries, and send newsletter updates if subscribed. We do not sell or lease your personal coordinates to third-party marketing companies.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">3. Cookies & Analytics</h3>
                        <p>
                            We collect basic usage logs and cookie tokens to analyze site traffic, improve layout performance, and customize visual settings (such as dark mode preferences). You can disable cookies inside your browser settings at any time.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">4. Your Rights</h3>
                        <p>
                            You have the right to request a complete list of your personal info saved in our systems, or request complete removal. Contact us at <span className="font-semibold text-orange-600">privacy@venturebuilders.com</span> to submit a removal request.
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
