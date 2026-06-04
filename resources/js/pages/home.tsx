import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Search, MapPin, BedDouble, Bath, Square, ArrowRight, Phone, MessageSquare, Quote, Heart, Award, ShieldCheck, Zap } from 'lucide-react';

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

interface BlogPost {
    id: number;
    title: string;
    category: string;
    author: string;
    date: string;
    excerpt: string;
    content: string;
    image: string;
}

interface HomeProps {
    featuredProperties: Property[];
    latestNews: BlogPost[];
    stats: {
        experience: number;
        buildings: number;
        clients: number;
    };
}

export default function Home({ featuredProperties, latestNews, stats }: HomeProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [propertyType, setPropertyType] = useState('all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('properties.index'), {
            search: searchQuery,
            type: propertyType,
        });
    };

    return (
        <PublicLayout>
            <Head title="Venture Builders - Premier Real Estate Portfolio" />

            {/* 1. Hero Search Area */}
            <section className="relative min-h-[85vh] lg:h-[calc(100vh-80px)] flex items-center justify-center bg-zinc-900 text-white py-20 overflow-hidden">
                {/* Background Image with Dark Overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
                    style={{ 
                        backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/80 to-zinc-900/60 z-10" />

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center lg:text-left">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Hero Text */}
                        <div className="lg:col-span-7 space-y-6">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-600/25 border border-orange-500/30 text-orange-400 rounded-full text-xs font-bold uppercase tracking-wider">
                                <Zap className="w-3 h-3" /> Welcoming You Home
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                                We Create Your <br />
                                <span className="text-orange-500 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                                    Dream Apartments
                                </span>
                            </h1>
                            <p className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Venture Builders creates premium living architectures across prime locations. Explore our selection of modern apartments, luxury flats, and residential plots.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <Link 
                                    href={route('properties.index')} 
                                    className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                                >
                                    <span>Explore Properties</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link 
                                    href={route('about')} 
                                    className="px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl border border-zinc-700 transition-all hover:-translate-y-0.5 active:scale-95"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        {/* Search Filter Panel */}
                        <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl">
                            <h3 className="text-xl font-bold mb-6 text-white text-left">Find Your Future Property</h3>
                            <form onSubmit={handleSearch} className="space-y-4 text-left">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">Search Location or Name</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Manhattan, New York"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-zinc-950/45 border border-zinc-700/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-zinc-400 outline-none transition-colors"
                                        />
                                        <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">Property Type</label>
                                    <select 
                                        value={propertyType}
                                        onChange={(e) => setPropertyType(e.target.value)}
                                        className="w-full bg-zinc-950/45 border border-zinc-700/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl py-3.5 px-4 text-sm text-zinc-200 outline-none transition-colors appearance-none"
                                    >
                                        <option value="all" className="bg-zinc-900 text-white">All Properties</option>
                                        <option value="apartment" className="bg-zinc-900 text-white">Apartments</option>
                                        <option value="flat" className="bg-zinc-900 text-white">Flats</option>
                                        <option value="plot" className="bg-zinc-900 text-white">Plots / Land</option>
                                    </select>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-md shadow-orange-600/20 active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
                                >
                                    <Search className="w-4 h-4" />
                                    <span>Find Properties</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Company Stats Section */}
            <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        {/* Stats Banner with Experience Badge */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
                                <img 
                                    src="https://preview.colorlib.com/theme/hus/img/banner/banner.png" 
                                    alt="About Venture Builders"
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent" />
                            </div>
                            {/* Float Badge */}
                            <div className="absolute -bottom-8 -right-4 sm:right-6 bg-orange-600 text-white p-6 rounded-3xl shadow-xl shadow-orange-600/20 text-center max-w-[180px] hover:scale-105 transition-transform duration-300">
                                <span className="block font-black text-4xl">{stats.experience}</span>
                                <span className="block text-xs font-bold uppercase tracking-wide text-orange-100 mt-1">Years Of Excellence</span>
                            </div>
                        </div>

                        {/* Description Text */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="space-y-2">
                                <span className="text-orange-600 font-extrabold text-sm uppercase tracking-wider">Who We Are</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                                    We Are Venture Builders <br />
                                    <span className="text-zinc-400 dark:text-zinc-500 font-normal">Your Premier Partner in Real Estate</span>
                                </h2>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
                                Founded on a vision to deliver exceptional residential and commercial spaces, Venture Builders has grown into a leading portfolio real estate company. We specialize in designing modern smart-homes, developing premium building assets, and identifying high-growth land plots.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-600" />
                                    <span>Architect-Led Modern Designs</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-600" />
                                    <span>High-Grade Construction Materials</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-600" />
                                    <span>Smart Integrated Living Systems</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-600" />
                                    <span>Clean Title deeds & Legit paperwork</span>
                                </li>
                            </ul>
                            
                            <div className="pt-6 border-t border-zinc-150 dark:border-zinc-800 flex gap-12">
                                <div className="text-center sm:text-left">
                                    <span className="block text-3xl font-black text-zinc-900 dark:text-white">{stats.buildings}+</span>
                                    <span className="text-xs text-zinc-500 uppercase font-bold tracking-wide">Buildings Completed</span>
                                </div>
                                <div className="text-center sm:text-left">
                                    <span className="block text-3xl font-black text-zinc-900 dark:text-white">{stats.clients}+</span>
                                    <span className="text-xs text-zinc-500 uppercase font-bold tracking-wide">Happy Clients</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Core Facilities Showcase */}
            <section className="py-20 bg-zinc-900 text-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                        <span className="text-orange-500 font-extrabold text-sm uppercase tracking-wider">Quality Features</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Our Signature Facilities</h2>
                        <p className="text-zinc-400 text-sm sm:text-base">
                            We pride ourselves on offering amenities and architectural steps that set our residential layouts apart.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Facility 1 */}
                        <div className="bg-zinc-800/50 border border-zinc-800 p-8 rounded-3xl space-y-4 hover:border-orange-500/30 hover:bg-zinc-800/80 transition-all hover:-translate-y-1">
                            <div className="p-4 bg-orange-600 text-white rounded-2xl inline-block shadow-md shadow-orange-500/10">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold">Architectural Design</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Every structure begins with a dedicated design stage focusing on natural ventilation, aesthetic integrity, and ergonomic flow.
                            </p>
                        </div>
                        {/* Facility 2 */}
                        <div className="bg-zinc-800/50 border border-zinc-800 p-8 rounded-3xl space-y-4 hover:border-orange-500/30 hover:bg-zinc-800/80 transition-all hover:-translate-y-1">
                            <div className="p-4 bg-orange-600 text-white rounded-2xl inline-block shadow-md shadow-orange-500/10">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold">Secure Gated Estates</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Safety is paramount. Enjoy 24/7 manned gates, CCTV integration, and intercom services for every building.
                            </p>
                        </div>
                        {/* Facility 3 */}
                        <div className="bg-zinc-800/50 border border-zinc-800 p-8 rounded-3xl space-y-4 hover:border-orange-500/30 hover:bg-zinc-800/80 transition-all hover:-translate-y-1">
                            <div className="p-4 bg-orange-600 text-white rounded-2xl inline-block shadow-md shadow-orange-500/10">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold">Smart System Integration</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Automated apartments with smart lighting controls, security alerts, and HVAC systems managed directly from your phone.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link 
                            href={route('facilities')} 
                            className="inline-flex items-center gap-1 font-bold text-orange-500 hover:text-orange-400 transition-colors"
                        >
                            <span>View All Facilities & Services</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. Featured Listings Grid */}
            <section className="py-20 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                        <div className="space-y-3">
                            <span className="text-orange-600 font-extrabold text-sm uppercase tracking-wider">Handpicked For You</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">Featured Properties</h2>
                        </div>
                        <Link 
                            href={route('properties.index')} 
                            className="px-5 py-2.5 bg-white hover:bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white font-bold text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 transition-all inline-flex items-center gap-2 self-start sm:self-auto"
                        >
                            <span>Browse All Listings</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProperties.map((property) => (
                            <article 
                                key={property.id} 
                                className="bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-200/60 dark:border-zinc-850 shadow-sm hover:shadow-md hover:border-orange-500/20 dark:hover:border-orange-500/20 transition-all duration-300 group"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                                    <img 
                                        src={property.image} 
                                        alt={property.title} 
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    {/* Status Badge */}
                                    <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow">
                                        {property.status}
                                    </span>
                                    {/* Property Type Badge */}
                                    <span className="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur-sm text-zinc-100 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">
                                        {property.type}
                                    </span>
                                    {/* Price tag Overlay */}
                                    <div className="absolute bottom-4 left-4 bg-zinc-900/90 backdrop-blur-sm text-orange-400 font-extrabold text-lg px-4 py-1.5 rounded-xl">
                                        ${property.price.toLocaleString()}
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="space-y-1.5">
                                        <h3 className="font-extrabold text-xl text-zinc-900 dark:text-white line-clamp-1 group-hover:text-orange-600 transition-colors">
                                            {property.title}
                                        </h3>
                                        <p className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                                            <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                                            <span className="line-clamp-1">{property.location}</span>
                                        </p>
                                    </div>

                                    {/* Spec Indicators (only display if not Plot) */}
                                    {property.type !== 'plot' ? (
                                        <div className="flex justify-between items-center py-3 border-y border-zinc-100 dark:border-zinc-900 text-sm text-zinc-600 dark:text-zinc-400 font-semibold">
                                            <span className="flex items-center gap-1.5">
                                                <BedDouble className="w-4 h-4 text-orange-500" />
                                                <span>{property.beds} Bed</span>
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Bath className="w-4 h-4 text-orange-500" />
                                                <span>{property.baths} Bath</span>
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Square className="w-4 h-4 text-orange-500" />
                                                <span>{property.sqft} sqft</span>
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="py-3 border-y border-zinc-100 dark:border-zinc-900 text-sm text-zinc-600 dark:text-zinc-400 font-semibold flex items-center justify-between">
                                            <span className="flex items-center gap-1.5">
                                                <Square className="w-4 h-4 text-orange-500" />
                                                <span>Plot Size: {property.sqft} sqft</span>
                                            </span>
                                            <span className="text-xs px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 rounded-lg">Utilities Ready</span>
                                        </div>
                                    )}

                                    <Link 
                                        href={route('properties.show', property.id)}
                                        className="w-full py-3 bg-zinc-50 dark:bg-zinc-900 hover:bg-orange-600 hover:text-white dark:hover:bg-orange-600 text-zinc-900 dark:text-white text-center font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-1 group/btn"
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

            {/* 5. Client Testimonials Area */}
            <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                        <span className="text-orange-600 font-extrabold text-sm uppercase tracking-wider">Testimonials</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">What Our Clients Say</h2>
                        <p className="text-zinc-500 text-sm sm:text-base">
                            Read testimonies from families and firms who purchased their homes through Venture Builders.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 space-y-6 relative">
                            <Quote className="w-10 h-10 text-orange-500/20 absolute right-8 top-8" />
                            <p className="text-zinc-600 dark:text-zinc-300 italic text-sm leading-relaxed">
                                "We bought our 3-bedroom flat in Chicago. The Venture Builders team walked us through the paperwork, connection of smart systems, and delivered exactly what was promised. 100% recommended!"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <img src="https://preview.colorlib.com/theme/hus/img/testmonial/author.png" alt="Margaret Lawson" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-zinc-950 dark:text-white text-sm">Margaret Lawson</h4>
                                    <span className="text-xs text-zinc-400">Creative Director</span>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 space-y-6 relative">
                            <Quote className="w-10 h-10 text-orange-500/20 absolute right-8 top-8" />
                            <p className="text-zinc-600 dark:text-zinc-300 italic text-sm leading-relaxed">
                                "The luxury penthouse in Miami Beach is a dream come true. The panoramic ocean views and wraps-around terrace are stunning. Excellent materials, superb acoustic insulation, and state of the art finishes."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <img src="https://preview.colorlib.com/theme/hus/img/testmonial/author2.png" alt="Donald Sinclair" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-zinc-950 dark:text-white text-sm">Donald Sinclair</h4>
                                    <span className="text-xs text-zinc-400">Architectural Investor</span>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 space-y-6 relative">
                            <Quote className="w-10 h-10 text-orange-500/20 absolute right-8 top-8" />
                            <p className="text-zinc-600 dark:text-zinc-300 italic text-sm leading-relaxed">
                                "Venture Builders made land plot acquisition simple. The corner lot in Austin came with all utility connections pre-established. Paved road access and papers ready. Very professional service."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">RH</div>
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-zinc-950 dark:text-white text-sm">Robert Harris</h4>
                                    <span className="text-xs text-zinc-400">Private Home Builder</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Quotation Callout Banner */}
            <section className="bg-orange-600 py-16 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80')" }} 
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
                    <div className="text-center lg:text-left space-y-2 max-w-xl">
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Get a Free Quotation Today!</h2>
                        <p className="text-orange-100 text-sm sm:text-base">
                            Have specific architectural designs or locations in mind? Send our development team your project ideas.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0">
                        <div className="flex items-center gap-3 bg-zinc-950/20 px-6 py-4 rounded-2xl border border-white/10 w-full sm:w-auto">
                            <div className="p-3 bg-white text-orange-600 rounded-xl">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block text-xs text-orange-200 font-bold uppercase tracking-wider">Say Hello</span>
                                <span className="block text-lg font-black tracking-tight">+44 563 986 4785</span>
                            </div>
                        </div>
                        <Link 
                            href={route('contact')}
                            className="px-8 py-4 bg-white text-orange-600 hover:bg-zinc-100 font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98] w-full sm:w-auto text-center flex items-center justify-center gap-2"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>Contact Us</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 7. Latest News / Blog Section */}
            <section className="py-20 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                        <span className="text-orange-600 font-extrabold text-sm uppercase tracking-wider">Market Insights</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">Our Latest News</h2>
                        <p className="text-zinc-500 text-sm sm:text-base">
                            Stay up-to-date with property investments, smart technology trends, and advice on buying your first flat.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {latestNews.map((post) => (
                            <article 
                                key={post.id} 
                                className="bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-200/60 dark:border-zinc-850 shadow-sm hover:shadow-md hover:border-orange-500/20 dark:hover:border-orange-500/20 transition-all duration-300 group flex flex-col h-full"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden bg-zinc-150 shrink-0">
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 
                                        className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-lg">
                                        {post.category}
                                    </span>
                                </div>

                                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                                    <div className="space-y-2">
                                        <div className="text-xs text-zinc-400 font-bold flex gap-3">
                                            <span>By {post.author}</span>
                                            <span>•</span>
                                            <span>{new Date(post.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                                        </div>
                                        <h3 className="font-extrabold text-lg sm:text-xl text-zinc-900 dark:text-white line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    <Link 
                                        href={route('blog.show', post.id)}
                                        className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400 self-start transition-colors group/link"
                                    >
                                        <span>Read article</span>
                                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
