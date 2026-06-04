import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Layers, Building, Cpu, MapPin, Leaf, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

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
        switch (iconName) {
            case 'sketch':
                return <Layers className="w-6 h-6" />;
            case 'hotel':
                return <Building className="w-6 h-6" />;
            case 'headset':
                return <Cpu className="w-6 h-6" />;
            case 'map-pin':
                return <MapPin className="w-6 h-6" />;
            case 'leaf':
                return <Leaf className="w-6 h-6" />;
            case 'shield':
                return <Shield className="w-6 h-6" />;
            default:
                return <Layers className="w-6 h-6" />;
        }
    };

    return (
        <PublicLayout>
            <Head title="Our Facilities - Venture Builders" />

            {/* 1. Header Banner */}
            <section className="bg-zinc-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80')" }} 
                />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    <span className="text-orange-500 font-extrabold text-sm uppercase tracking-wider">What We Provide</span>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Our Premium Facilities</h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                        A detailed breakdown of the construction specifications, smart features, and community amenities included in every project.
                    </p>
                </div>
            </section>

            {/* 2. Facilities Grid */}
            <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facilities.map((fac) => (
                            <div 
                                key={fac.id} 
                                className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 p-8 rounded-3xl space-y-4 hover:border-orange-500/25 hover:bg-white dark:hover:bg-zinc-950 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="p-4 bg-orange-600 text-white rounded-2xl inline-block shadow-md shadow-orange-500/10">
                                    {getIconComponent(fac.icon)}
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{fac.title}</h3>
                                <p className="text-sm text-zinc-550 dark:text-zinc-400 leading-relaxed">
                                    {fac.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Detailed Standards / Construction Checklist */}
            <section className="py-20 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200/60 dark:border-zinc-850 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-6 space-y-6">
                            <span className="text-orange-600 font-extrabold text-sm uppercase tracking-wider">Quality Controls</span>
                            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                                Built to Endure: <br /> Our Construction Standards
                            </h2>
                            <p className="text-zinc-650 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
                                We enforce strict checklists during all development phases, from site testing to high-end interior installations. Our engineering team conducts routine safety assessments, and every apartment features architectural details focused on spatial optimization.
                            </p>
                            
                            {/* Bullet Checklist */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div className="flex gap-2 items-start">
                                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Concrete Testing</h4>
                                        <p className="text-xs text-zinc-500">Grade M25 structural verification</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-start">
                                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Soundproof Walls</h4>
                                        <p className="text-xs text-zinc-500">Dual drywalls with thermal insulation</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-start">
                                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Anti-Leak Pipes</h4>
                                        <p className="text-xs text-zinc-500">Certified CPVC leakless pipeline</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-start">
                                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Smart Wiring</h4>
                                        <p className="text-xs text-zinc-500">Fire-resistant low-smoke copper lines</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-6">
                            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800">
                                <img 
                                    src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80" 
                                    alt="Modern construction" 
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Help CTA */}
            <section className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-300 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">Have Questions About Specs?</h2>
                    <p className="text-zinc-500 text-sm max-w-xl mx-auto">
                        Speak directly with our technical supervisor or broker to request blueprints and utility details for your desired property.
                    </p>
                    <div>
                        <Link 
                            href={route('contact')}
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
                        >
                            <span>Speak to an Agent</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
