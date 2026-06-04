import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Building2, Car, CheckCircle2, Clock, Dumbbell, Home, Layers, Leaf, Lock, MapPin, Phone, Shield, Star, Sun, Trees, Waves, Wifi, Zap } from 'lucide-react';
import React from 'react';

interface Facility {
    id: number;
    title: string;
    description: string;
    icon: string;
}

interface FacilitiesProps {
    facilities: Facility[];
}

export default function Facilities({ facilities }: FacilitiesProps) {
    // Helper to resolve icon from database/mock string to Lucide React component

    const getIconComponent = (iconName: string) => {
        const cls = 'w-6 h-6';
        const map: Record<string, React.ReactNode> = {
            Shield: <Shield className={cls} />,
            Building2: <Building2 className={cls} />,
            Leaf: <Leaf className={cls} />,
            Zap: <Zap className={cls} />,
            Waves: <Waves className={cls} />,
            Car: <Car className={cls} />,
            Wifi: <Wifi className={cls} />,
            Lock: <Lock className={cls} />,
            Dumbbell: <Dumbbell className={cls} />,
            Trees: <Trees className={cls} />,
            Sun: <Sun className={cls} />,
            Star: <Star className={cls} />,
            Home: <Home className={cls} />,
            MapPin: <MapPin className={cls} />,
            Phone: <Phone className={cls} />,
            Clock: <Clock className={cls} />,
        };
        return map[iconName] ?? <Layers className={cls} />;
    };

    return (
        <PublicLayout>
            <Head title="Our Facilities - Venture Builders" />

            {/* 1. Header Banner */}
            <section className="relative overflow-hidden bg-zinc-900 py-20 text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80')" }}
                />
                <div className="relative z-10 mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
                    <span className="text-sm font-extrabold tracking-wider text-orange-500 uppercase">What We Provide</span>
                    <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Our Premium Facilities</h1>
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                        A detailed breakdown of the construction specifications, smart features, and community amenities included in every project.
                    </p>
                </div>
            </section>

            {/* 2. Facilities Grid */}
            <section className="bg-white py-20 transition-colors duration-300 dark:bg-zinc-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {facilities.map((fac) => (
                            <div
                                key={fac.id}
                                className="space-y-4 rounded-3xl bg-zinc-50 p-8 shadow-sm transition-all duration-300 hover:border-orange-500/25 hover:bg-white hover:shadow-md dark:bg-zinc-900 dark:hover:bg-zinc-950"
                            >
                                <div className="inline-block rounded-2xl bg-orange-600 p-4 text-white shadow-md shadow-orange-500/10">
                                    {getIconComponent(fac.icon)}
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                                    {fac.title}
                                </h3>
                                <p className="text-zinc-550 text-sm leading-relaxed dark:text-zinc-400">{fac.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Detailed Standards / Construction Checklist */}
            <section className="bg-zinc-50 py-20 transition-colors duration-300 dark:bg-zinc-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
                        <div className="space-y-6 lg:col-span-6">
                            <span className="text-sm font-extrabold tracking-wider text-orange-600 uppercase">Quality Controls</span>
                            <h2 className="text-3xl leading-tight font-extrabold text-zinc-900 dark:text-white">
                                Built to Endure: <br /> Our Construction Standards
                            </h2>
                            <p className="text-zinc-650 text-sm leading-relaxed sm:text-base dark:text-zinc-400">
                                We enforce strict checklists during all development phases, from site testing to high-end interior installations. Our
                                engineering team conducts routine safety assessments, and every apartment features architectural details focused on
                                spatial optimization.
                            </p>

                            {/* Bullet Checklist */}
                            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
                                    <div>
                                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Concrete Testing</h4>
                                        <p className="text-xs text-zinc-500">Grade M25 structural verification</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
                                    <div>
                                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Soundproof Walls</h4>
                                        <p className="text-xs text-zinc-500">Dual drywalls with thermal insulation</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
                                    <div>
                                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Anti-Leak Pipes</h4>
                                        <p className="text-xs text-zinc-500">Certified CPVC leakless pipeline</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
                                    <div>
                                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Smart Wiring</h4>
                                        <p className="text-xs text-zinc-500">Fire-resistant low-smoke copper lines</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-6">
                            <div className="relative aspect-video overflow-hidden rounded-3xl border border-zinc-200 shadow-xl dark:border-zinc-800">
                                <img
                                    src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
                                    alt="Modern construction"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Help CTA */}
            <section className="bg-white py-16 text-center transition-colors duration-300 dark:bg-zinc-950">
                <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl dark:text-white">Have Questions About Specs?</h2>
                    <p className="mx-auto max-w-xl text-sm text-zinc-500">
                        Speak directly with our technical supervisor or broker to request blueprints and utility details for your desired property.
                    </p>
                    <div>
                        <Link
                            href={route('contact')}
                            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 font-bold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95"
                        >
                            <span>Speak to an Agent</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
