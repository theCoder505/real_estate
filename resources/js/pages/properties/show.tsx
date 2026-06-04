import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { MapPin, BedDouble, Bath, Square, ChevronRight, CheckCircle2, Phone, Mail, ArrowRight, MessageSquare } from 'lucide-react';

interface Property {
    id: number;
    title: string;
    type: string;
    price: number;
    location: string;
    description: string;
    beds: number;
    baths: number;
    sqft: number;
    image: string;
    featured: boolean;
    features: string[];
    status: string;
}

interface ShowProps {
    property: Property;
    relatedProperties: Property[];
}

export default function Show({ property, relatedProperties }: ShowProps) {
    // Form for agent contact lead
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        message: `Hi, I am interested in "${property.title}" (${property.location}). Please send me detailed blueprints and price negotiations.`,
    });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contact.submit'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('name', 'email', 'phone');
            },
        });
    };

    return (
        <PublicLayout>
            <Head title={`${property.title} - Venture Builders`} />

            {/* 1. Breadcrumbs Header */}
            <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200/50 dark:border-zinc-800/50 py-4 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-550 dark:text-zinc-400">
                    <Link href={route('home')} className="hover:text-orange-500 transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                    <Link href={route('properties.index')} className="hover:text-orange-500 transition-colors">Properties</Link>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                    <span className="text-zinc-800 dark:text-white line-clamp-1">{property.title}</span>
                </div>
            </div>

            {/* 2. Main details area */}
            <section className="py-12 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left: Property Overview & Specs */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Main image */}
                            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100">
                                <img 
                                    src={property.image} 
                                    alt={property.title} 
                                    className="object-cover w-full h-full"
                                />
                                <span className="absolute top-6 left-6 bg-orange-600 text-white text-xs font-extrabold px-4 py-2 rounded-xl uppercase tracking-wider shadow-lg">
                                    {property.status}
                                </span>
                            </div>

                            {/* Title, Location & Price */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div className="space-y-2">
                                    <span className="inline-block bg-orange-150 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg">
                                        {property.type}
                                    </span>
                                    <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white leading-tight">
                                        {property.title}
                                    </h1>
                                    <p className="flex items-center gap-1.5 text-zinc-550 dark:text-zinc-400 text-sm font-semibold">
                                        <MapPin className="w-4.5 h-4.5 text-orange-500 shrink-0" />
                                        <span>{property.location}</span>
                                    </p>
                                </div>
                                <div className="text-left sm:text-right shrink-0">
                                    <span className="block text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Asking Price</span>
                                    <span className="block text-2xl sm:text-3xl font-black text-orange-600 mt-1">
                                        ${property.price.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Specification sheets (if not Plot) */}
                            {property.type !== 'plot' ? (
                                <div className="grid grid-cols-3 gap-4 py-6 border-y border-zinc-200/60 dark:border-zinc-850 text-center font-bold">
                                    <div className="space-y-1 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/30 dark:border-zinc-800/40">
                                        <BedDouble className="w-5 h-5 text-orange-500 mx-auto" />
                                        <span className="block text-sm text-zinc-500 font-medium">Bedrooms</span>
                                        <span className="block text-lg text-zinc-900 dark:text-white">{property.beds}</span>
                                    </div>
                                    <div className="space-y-1 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/30 dark:border-zinc-800/40">
                                        <Bath className="w-5 h-5 text-orange-500 mx-auto" />
                                        <span className="block text-sm text-zinc-500 font-medium">Bathrooms</span>
                                        <span className="block text-lg text-zinc-900 dark:text-white">{property.baths}</span>
                                    </div>
                                    <div className="space-y-1 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/30 dark:border-zinc-800/40">
                                        <Square className="w-5 h-5 text-orange-500 mx-auto" />
                                        <span className="block text-sm text-zinc-500 font-medium">Area Size</span>
                                        <span className="block text-lg text-zinc-900 dark:text-white">{property.sqft} sqft</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-6 border-y border-zinc-200/60 dark:border-zinc-850 text-center sm:text-left font-bold flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/30 dark:border-zinc-800/40">
                                    <div className="flex gap-3 items-center">
                                        <Square className="w-6 h-6 text-orange-500 shrink-0" />
                                        <div className="text-left">
                                            <span className="block text-xs text-zinc-500 font-medium">Plot Area Dimensions</span>
                                            <span className="block text-lg text-zinc-900 dark:text-white">{property.sqft} sqft</span>
                                        </div>
                                    </div>
                                    <span className="bg-orange-100 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">Ready for Development</span>
                                </div>
                            )}

                            {/* Description block */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Property Description</h3>
                                <p className="text-zinc-655 dark:text-zinc-405 leading-relaxed text-sm sm:text-base">
                                    {property.description}
                                </p>
                            </div>

                            {/* Features list checklist */}
                            <div className="space-y-4 pt-4">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Amenities & Features</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    {property.features.map((feat, idx) => (
                                        <div key={idx} className="flex gap-2 items-center">
                                            <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact Lead Form */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 p-6 sm:p-8 rounded-3xl space-y-6">
                                <div className="text-center pb-4 border-b border-zinc-200 dark:border-zinc-800 space-y-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-200 mx-auto shadow border-2 border-white dark:border-zinc-800">
                                        <img src="https://preview.colorlib.com/theme/hus/img/testmonial/author.png" alt="Sarah Jenkins" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-zinc-900 dark:text-white">Sarah Jenkins</h4>
                                        <span className="block text-xs text-zinc-400 font-bold uppercase tracking-wider mt-0.5">Venture Builders Broker</span>
                                    </div>
                                </div>

                                <h3 className="font-bold text-zinc-900 dark:text-white text-base">Request Private Tour & Specs</h3>
                                <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Your Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 rounded-xl py-2.5 px-3 text-sm text-zinc-850 dark:text-zinc-200 outline-none focus:border-orange-500 transition-colors"
                                        />
                                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Email Address</label>
                                        <input 
                                            type="email" 
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 rounded-xl py-2.5 px-3 text-sm text-zinc-850 dark:text-zinc-200 outline-none focus:border-orange-500 transition-colors"
                                        />
                                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Phone Number (Optional)</label>
                                        <input 
                                            type="text" 
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 rounded-xl py-2.5 px-3 text-sm text-zinc-850 dark:text-zinc-200 outline-none focus:border-orange-500 transition-colors"
                                        />
                                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Custom Message</label>
                                        <textarea 
                                            required
                                            rows={4}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 rounded-xl py-2.5 px-3 text-sm text-zinc-850 dark:text-zinc-200 outline-none focus:border-orange-500 transition-colors resize-none"
                                        />
                                        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-orange-500/10 active:scale-[0.98] flex items-center justify-center gap-1.5"
                                    >
                                        <MessageSquare className="w-4.5 h-4.5" />
                                        <span>Send Request</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Related Listings section */}
            {relatedProperties.length > 0 && (
                <section className="py-16 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200/50 dark:border-zinc-850 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-8">Related Properties</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedProperties.map((related) => (
                                <article 
                                    key={related.id} 
                                    className="bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-200/60 dark:border-zinc-850 shadow-sm hover:shadow-md hover:border-orange-500/20 dark:hover:border-orange-500/20 transition-all duration-300 group"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                                        <img 
                                            src={related.image} 
                                            alt={related.title} 
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                                            {related.status}
                                        </span>
                                        <div className="absolute bottom-4 left-4 bg-zinc-900/90 backdrop-blur-sm text-orange-400 font-extrabold text-lg px-4 py-1.5 rounded-xl">
                                            ${related.price.toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white line-clamp-1 group-hover:text-orange-600 transition-colors">
                                            {related.title}
                                        </h3>
                                        <p className="flex items-center gap-1 text-sm text-zinc-500">
                                            <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                                            <span className="line-clamp-1">{related.location}</span>
                                        </p>

                                        <Link 
                                            href={route('properties.show', related.id)}
                                            className="w-full py-2.5 bg-zinc-50 dark:bg-zinc-900 hover:bg-orange-600 hover:text-white dark:hover:bg-orange-600 text-zinc-900 dark:text-white text-center font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-1 group/btn"
                                        >
                                            <span>View Details</span>
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
