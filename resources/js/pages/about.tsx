import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Building2, Heart, Shield, Sparkles, Target, Users } from 'lucide-react';

interface AboutProps {
    stats: {
        experience: number;
        buildings: number;
        clients: number;
        agents: number;
    };
}

export default function About({ stats }: AboutProps) {
    const coreValues = [
        {
            icon: Shield,
            title: 'Integrity First',
            description: 'We believe in 100% transparency in paperwork, property titles, and pricing. No hidden fees, no fine print.'
        },
        {
            icon: Sparkles,
            title: 'Uncompromised Quality',
            description: 'We partner with leading structural engineers and design experts to ensure our properties exceed quality parameters.'
        },
        {
            icon: Heart,
            title: 'Client Centricity',
            description: 'Your dream apartment is personal to you, and it is to us. We tailor our consultations to fit your family needs.'
        }
    ];

    const team = [
        {
            name: 'Sarah Jenkins',
            role: 'Founder & CEO',
            bio: 'Sarah has over 15 years of experience in property acquisition and building development across metropolitan areas.',
            image: 'https://preview.colorlib.com/theme/hus/img/testmonial/author.png'
        },
        {
            name: 'David Miller',
            role: 'Head of Engineering & Systems',
            bio: 'David leads our construction inspections and smart system integrations, ensuring top-tier safety and technology metrics.',
            image: 'https://preview.colorlib.com/theme/hus/img/testmonial/author2.png'
        },
        {
            name: 'Margaret Lawson',
            role: 'Brokerage & Public Relations',
            bio: 'Margaret is our leading contact for client consultations, guiding first-time home buyers through secure transactions.',
            image: 'https://preview.colorlib.com/theme/hus/img/testmonial/author2.png'
        }
    ];

    return (
        <PublicLayout>
            <Head title="About Us - Venture Builders" />

            {/* 1. Header Banner */}
            <section className="bg-zinc-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80')" }} 
                />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    <span className="text-orange-500 font-extrabold text-sm uppercase tracking-wider">Our Story</span>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight">About Venture Builders</h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                        Dedicated to designing premium housing, secure gated flats, and high-value residential plots.
                    </p>
                </div>
            </section>

            {/* 2. Detailed History & Mission */}
            <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Our Journey Since 2016</h2>
                            <p className="text-zinc-600 dark:text-zinc-350 leading-relaxed text-sm sm:text-base">
                                Venture Builders began as a boutique land scouting group in Austin, Texas. Our commitment to securing plots with pre-verified land registration titles quickly built market trust. Recognizing a lack of quality control in affordable suburban apartments, we expanded into architect-led construction in 2018.
                            </p>
                            <p className="text-zinc-600 dark:text-zinc-350 leading-relaxed text-sm sm:text-base">
                                Today, we manage a diversified real estate portfolio, connecting hundreds of happy families with comfortable homes. Our design guidelines focus on eco-friendly water collection, modern smart lighting, and robust concrete structures.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl text-center space-y-1.5 border border-zinc-200/55 dark:border-zinc-850">
                                <span className="block font-black text-3xl sm:text-4xl text-orange-600">{stats.experience}+</span>
                                <span className="block text-xs text-zinc-500 font-bold uppercase tracking-wider">Years of Experience</span>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl text-center space-y-1.5 border border-zinc-200/55 dark:border-zinc-850">
                                <span className="block font-black text-3xl sm:text-4xl text-orange-600">{stats.buildings}+</span>
                                <span className="block text-xs text-zinc-500 font-bold uppercase tracking-wider">Buildings Finished</span>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl text-center space-y-1.5 border border-zinc-200/55 dark:border-zinc-850">
                                <span className="block font-black text-3xl sm:text-4xl text-orange-600">{stats.clients}+</span>
                                <span className="block text-xs text-zinc-500 font-bold uppercase tracking-wider">Satisfied Clients</span>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl text-center space-y-1.5 border border-zinc-200/55 dark:border-zinc-850">
                                <span className="block font-black text-3xl sm:text-4xl text-orange-600">{stats.agents}+</span>
                                <span className="block text-xs text-zinc-500 font-bold uppercase tracking-wider">Expert Agents</span>
                            </div>
                        </div>
                    </div>

                    {/* Mission and Vision Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 space-y-4">
                            <div className="p-3 bg-orange-600/10 text-orange-600 rounded-xl inline-block">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Our Mission</h3>
                            <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                                To develop residential and commercial architectures that combine absolute safety, custom technological ease, and environmental sustainability, ensuring clients acquire high-growth building assets.
                            </p>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 space-y-4">
                            <div className="p-3 bg-orange-600/10 text-orange-600 rounded-xl inline-block">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Our Vision</h3>
                            <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                                To establish Venture Builders as a global hallmark of transparent property transactions and high-fidelity constructions, making premium smart-home designs standard.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Core Values */}
            <section className="py-20 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200/65 dark:border-zinc-850 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                        <span className="text-orange-600 font-extrabold text-sm uppercase tracking-wider">Guidelines</span>
                        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Our Core Values</h2>
                        <p className="text-zinc-500 text-sm">Our operations are anchored on these primary benchmarks.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {coreValues.map((val, idx) => {
                            const IconComponent = val.icon;
                            return (
                                <div key={idx} className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 space-y-4 shadow-sm">
                                    <div className="p-3.5 bg-orange-600 text-white rounded-2xl inline-block shadow-md shadow-orange-500/15">
                                        <IconComponent className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{val.title}</h3>
                                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{val.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. Team Members */}
            <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                        <span className="text-orange-600 font-extrabold text-sm uppercase tracking-wider">Expert Team</span>
                        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Meet Our Leaders</h2>
                        <p className="text-zinc-500 text-sm">Dedicated real estate developers guiding your buying journey.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {team.map((member, idx) => (
                            <div key={idx} className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200/60 dark:border-zinc-850 flex flex-col items-center p-6 text-center space-y-4 group">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-200 border-4 border-white dark:border-zinc-800 shadow-md group-hover:scale-105 transition-transform duration-300">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">{member.name}</h3>
                                    <span className="block text-xs text-orange-600 font-bold uppercase tracking-wider">{member.role}</span>
                                </div>
                                <p className="text-xs sm:text-sm text-zinc-550 dark:text-zinc-400 leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
