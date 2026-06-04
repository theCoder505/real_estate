import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function Terms() {
    return (
        <PublicLayout>
            <Head title="Terms of Service - Venture Builders" />

            {/* 1. Header Banner */}
            <section className="bg-zinc-900 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80')" }} 
                />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
                    <span className="text-orange-500 font-extrabold text-sm uppercase tracking-wider">Compliance</span>
                    <h1 className="text-4xl font-black tracking-tight">Terms of Service</h1>
                    <p className="text-zinc-400 max-w-xl mx-auto text-xs sm:text-sm">
                        Please review the terms of service governing property transactions, tours, and listings.
                    </p>
                </div>
            </section>

            {/* 2. Content */}
            <section className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                    <div className="flex gap-3 items-center pb-4 border-b border-zinc-150 dark:border-zinc-900">
                        <ShieldCheck className="w-8 h-8 text-orange-600 shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Website & Services Agreement</h2>
                            <p className="text-xs text-zinc-500">Last updated: June 2026</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">1. Agreement to Terms</h3>
                        <p>
                            By accessing and browsing this website, you agree to comply with and be bound by these Terms of Service. If you disagree with any segment, you should terminate use immediately.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">2. Listing Accuracy</h3>
                        <p>
                            All information regarding properties, apartments, prices, dimensions (sqft), and locations are intended for illustrative and inquiry purposes. While we strive to maintain absolute accuracy, listing specifics do not constitute a binding legal offer until formally signed under a purchase agreement.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">3. Intellectual Property</h3>
                        <p>
                            The logo, brand name, custom page layout designs, structural write-ups, and custom pictures displayed on this site are protected by copyright laws. Copying page architectures or graphics without express consent is prohibited.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">4. Brokerage Limitation of Liability</h3>
                        <p>
                            Venture Builders acts as the builder and broker of the properties shown. We are not liable for external network delays, third-party banking errors during transaction deposits, or local suburban utility service alterations out of our control.
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
