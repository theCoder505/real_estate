import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Quote, Star, ChevronRight, Home } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    image_path: string;
    rating?: number;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
    return (
        <PublicLayout>
            <Head title="Client Testimonials - Venture Builders" />

            {/* Breadcrumbs */}
            <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200/50 dark:border-zinc-850/50 py-4 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-550 dark:text-zinc-400">
                    <Link href={route('home')} className="hover:text-orange-500 transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                    <span className="text-zinc-800 dark:text-white">Testimonials</span>
                </div>
            </div>

            {/* Header Banner */}
            <section className="bg-zinc-900 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80')" }}
                />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
                    <span className="text-orange-500 font-extrabold text-sm uppercase tracking-wider">Testimonials</span>
                    <h1 className="text-4xl font-black tracking-tight">What Our Clients Say</h1>
                    <p className="text-zinc-400 max-w-xl mx-auto text-xs sm:text-sm">
                        Real stories of property investment success, blueprints, and home buying consultancies.
                    </p>
                </div>
            </section>

            {/* Testimonials List */}
            <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {testimonials.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {testimonials.map((t) => (
                                <div key={t.id} className="relative space-y-6 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                                    <Quote className="absolute top-8 right-8 h-10 w-10 text-orange-500/20" />
                                    
                                    <div className="space-y-4 flex-grow">
                                        {t.rating && (
                                            <div className="flex gap-1">
                                                {Array.from({ length: t.rating }).map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                                                ))}
                                            </div>
                                        )}
                                        <p className="text-sm leading-relaxed text-zinc-650 italic dark:text-zinc-300">
                                            "{t.content}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 pt-6 mt-6 border-t border-zinc-200/60 dark:border-zinc-800/60">
                                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-850">
                                            {t.image_path ? (
                                                <img
                                                    src={t.image_path.startsWith('http') ? t.image_path : `/${t.image_path}`}
                                                    alt={t.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-orange-600 text-sm font-bold text-white uppercase">
                                                    {t.name.substring(0, 2)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-extrabold text-zinc-950 dark:text-white">{t.name}</h4>
                                            <span className="text-xs text-zinc-400">{t.role}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-md mx-auto space-y-4">
                            <Quote className="w-12 h-12 text-zinc-400 mx-auto opacity-30" />
                            <div className="space-y-1">
                                <h3 className="font-bold text-lg text-zinc-900 dark:text-white">No testimonials available</h3>
                                <p className="text-sm text-zinc-550">We are currently collecting reviews from our happy families.</p>
                            </div>
                            <Link
                                href={route('home')}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg transition-all"
                            >
                                <Home className="w-3.5 h-3.5" />
                                <span>Go Back Home</span>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
