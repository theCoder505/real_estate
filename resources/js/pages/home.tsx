import PublicLayout from '@/layouts/public-layout';
import { Head, Link, router } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, Award, ChevronLeft, ChevronRight, MessageSquare, Phone, Quote, Search, ShieldCheck, Zap } from 'lucide-react';
import React, { useCallback, useState } from 'react';

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
    image_path: string;
    featured: boolean;
    features: string[];
    status: string;
}

interface BlogPost {
    id: number;
    title: string;
    category: string;
    author: string;
    published_at: string;
    excerpt: string;
    content: string;
    image_path: string;
}

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    image_path: string;
    rating?: number;
}

interface HomeProps {
    featuredProperties: Property[];
    latestNews: BlogPost[];
    testimonials: Testimonial[];
    settings: any;
    stats: {
        experience: number;
        buildings: number;
        clients: number;
    };
}

export default function Home({ featuredProperties, latestNews, stats, testimonials, settings }: HomeProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [propertyType, setPropertyType] = useState('all');

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    // Slider for testimonials
    const [testimonialEmblaRef, testimonialEmblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
        Autoplay({ delay: 6000, stopOnInteraction: true })
    ]);

    const scrollTestimonialPrev = useCallback(() => {
        if (testimonialEmblaApi) testimonialEmblaApi.scrollPrev();
    }, [testimonialEmblaApi]);

    const scrollTestimonialNext = useCallback(() => {
        if (testimonialEmblaApi) testimonialEmblaApi.scrollNext();
    }, [testimonialEmblaApi]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('properties.index'), {
            search: searchQuery,
            type: propertyType,
        });
    };

    const currencySym = settings?.currency_symbol || '$';

    return (
        <PublicLayout>
            <Head title="Venture Builders - Premier Real Estate Portfolio" />

            {/* 1. Hero Search Area */}
            <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-zinc-900 py-20 text-white lg:h-[calc(100vh-80px)]">
                {/* Background Image with Dark Overlay */}
                <div
                    className="absolute inset-0 z-0 scale-105 bg-cover bg-center motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80')",
                    }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-zinc-950/95 via-zinc-950/80 to-zinc-900/60" />

                <div className="relative z-20 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8 lg:text-left">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        {/* Hero Text */}
                        <div className="space-y-6 lg:col-span-7">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-600/25 px-3 py-1 text-xs font-bold tracking-wider text-orange-400 uppercase">
                                <Zap className="h-3 w-3" /> Welcoming You Home
                            </span>
                            <h1 className="text-4xl leading-[1.1] font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                                We Create Your <br />
                                <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-orange-500 text-transparent">
                                    Dream Apartments
                                </span>
                            </h1>
                            <p className="mx-auto max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg lg:mx-0">
                                Venture Builders creates premium living architectures across prime locations. Explore our selection of modern
                                apartments, luxury flats, and residential plots.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                                <Link
                                    href={route('properties.index')}
                                    className="flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-orange-500/40 active:scale-95"
                                >
                                    <span>Explore Properties</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={route('about')}
                                    className="rounded-xl border border-zinc-700 bg-zinc-800 px-6 py-3.5 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-700 active:scale-95"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        {/* Search Filter Panel */}
                        <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-8 lg:col-span-5">
                            <h3 className="mb-6 text-left text-xl font-bold text-white">Find Your Future Property</h3>
                            <form onSubmit={handleSearch} className="space-y-4 text-left">
                                <div>
                                    <label className="mb-2 block text-xs font-bold tracking-wider text-zinc-300 uppercase">
                                        Search Location or Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="e.g. Manhattan, New York"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full rounded-xl border border-zinc-700/80 bg-zinc-950/45 py-3.5 pr-4 pl-11 text-sm text-white placeholder-zinc-400 transition-colors outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                        />
                                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-bold tracking-wider text-zinc-300 uppercase">Property Type</label>
                                    <select
                                        value={propertyType}
                                        onChange={(e) => setPropertyType(e.target.value)}
                                        className="w-full appearance-none rounded-xl border border-zinc-700/80 bg-zinc-950/45 px-4 py-3.5 text-sm text-zinc-200 transition-colors outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                    >
                                        <option value="all" className="bg-zinc-900 text-white">
                                            All Properties
                                        </option>
                                        <option value="apartment" className="bg-zinc-900 text-white">
                                            Apartments
                                        </option>
                                        <option value="flat" className="bg-zinc-900 text-white">
                                            Flats
                                        </option>
                                        <option value="plot" className="bg-zinc-900 text-white">
                                            Plots / Land
                                        </option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-4 font-bold text-white shadow-md shadow-orange-600/20 transition-all hover:bg-orange-700 active:scale-[0.98]"
                                >
                                    <Search className="h-4 w-4" />
                                    <span>Find Properties</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Company Stats Section */}
            <section className="bg-white py-20 transition-colors duration-300 dark:bg-zinc-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
                        {/* Stats Banner with Experience Badge */}
                        <div className="relative lg:col-span-5">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-200 shadow-2xl dark:border-zinc-800">
                                <img
                                    src="https://preview.colorlib.com/theme/hus/img/banner/banner.png"
                                    alt="About Venture Builders"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent" />
                            </div>
                            {/* Float Badge */}
                            <div className="absolute -right-4 -bottom-8 max-w-[180px] rounded-3xl bg-orange-600 p-6 text-center text-white shadow-xl shadow-orange-600/20 transition-transform duration-300 hover:scale-105 sm:right-6">
                                <span className="block text-4xl font-black">{stats.experience}</span>
                                <span className="mt-1 block text-xs font-bold tracking-wide text-orange-100 uppercase">Years Of Excellence</span>
                            </div>
                        </div>

                        {/* Description Text */}
                        <div className="space-y-6 lg:col-span-7">
                            <div className="space-y-2">
                                <span className="text-sm font-extrabold tracking-wider text-orange-600 uppercase">Who We Are</span>
                                <h2 className="text-3xl leading-tight font-extrabold text-zinc-900 sm:text-4xl dark:text-white">
                                    We Are Venture Builders <br />
                                    <span className="font-normal text-zinc-400 dark:text-zinc-500">Your Premier Partner in Real Estate</span>
                                </h2>
                            </div>
                            <p className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-300">
                                Founded on a vision to deliver exceptional residential and commercial spaces, Venture Builders has grown into a
                                leading portfolio real estate company. We specialize in designing modern smart-homes, developing premium building
                                assets, and identifying high-growth land plots.
                            </p>
                            <ul className="grid grid-cols-1 gap-4 text-sm font-semibold text-zinc-700 sm:grid-cols-2 dark:text-zinc-300">
                                <li className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-orange-600" />
                                    <span>Architect-Led Modern Designs</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-orange-600" />
                                    <span>High-Grade Construction Materials</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-orange-600" />
                                    <span>Smart Integrated Living Systems</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-orange-600" />
                                    <span>Clean Title deeds & Legit paperwork</span>
                                </li>
                            </ul>

                            <div className="border-zinc-150 flex gap-12 border-t pt-6 dark:border-zinc-800">
                                <div className="text-center sm:text-left">
                                    <span className="block text-3xl font-black text-zinc-900 dark:text-white">{stats.buildings}+</span>
                                    <span className="text-xs font-bold tracking-wide text-zinc-550 uppercase">Buildings Completed</span>
                                </div>
                                <div className="text-center sm:text-left">
                                    <span className="block text-3xl font-black text-zinc-900 dark:text-white">{stats.clients}+</span>
                                    <span className="text-xs font-bold tracking-wide text-zinc-550 uppercase">Happy Clients</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Core Facilities Showcase */}
            <section className="relative bg-black py-20 text-white">
                <div className="absolute inset-0 bg-[url('/assets/images/sign_bg.png')] bg-cover bg-center bg-no-repeat opacity-10"></div>
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-16 max-w-3xl space-y-3 text-center">
                        <span className="text-sm font-extrabold tracking-wider text-orange-500 uppercase">Quality Features</span>
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Our Signature Facilities</h2>
                        <p className="text-sm text-zinc-400 sm:text-base">
                            We pride ourselves on offering amenities and architectural steps that set our residential layouts apart.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Facility 1 */}
                        <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-800/50 p-8 transition-all hover:-translate-y-1 hover:border-orange-500/30 hover:bg-zinc-800/80">
                            <div className="inline-block rounded-2xl bg-orange-600 p-4 text-white shadow-md shadow-orange-500/10">
                                <Award className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Architectural Design</h3>
                            <p className="text-sm leading-relaxed text-zinc-400">
                                Every structure begins with a dedicated design stage focusing on natural ventilation, aesthetic integrity, and
                                ergonomic flow.
                            </p>
                        </div>
                        {/* Facility 2 */}
                        <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-800/50 p-8 transition-all hover:-translate-y-1 hover:border-orange-500/30 hover:bg-zinc-800/80">
                            <div className="inline-block rounded-2xl bg-orange-600 p-4 text-white shadow-md shadow-orange-500/10">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Secure Gated Estates</h3>
                            <p className="text-sm leading-relaxed text-zinc-400">
                                Safety is paramount. Enjoy 24/7 manned gates, CCTV integration, and intercom services for every building.
                            </p>
                        </div>
                        {/* Facility 3 */}
                        <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-800/50 p-8 transition-all hover:-translate-y-1 hover:border-orange-500/30 hover:bg-zinc-800/80">
                            <div className="inline-block rounded-2xl bg-orange-600 p-4 text-white shadow-md shadow-orange-500/10">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Smart System Integration</h3>
                            <p className="text-sm leading-relaxed text-zinc-400">
                                Automated apartments with smart lighting controls, security alerts, and HVAC systems managed directly from your phone.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href={route('facilities')}
                            className="inline-flex items-center gap-1 font-bold text-orange-500 transition-colors hover:text-orange-400"
                        >
                            <span>View All Facilities & Services</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. Featured Listings Slider */}
            <section className="bg-white pt-40 pb-10 transition-colors duration-300 dark:bg-zinc-950">
                <div className="">
                    <div className="mx-auto mb-16 max-w-3xl space-y-3 text-center">
                        <span className="text-sm font-extrabold tracking-wider text-orange-600 uppercase">Handpicked For You</span>
                        <h2 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl dark:text-white">Featured Properties</h2>
                        <p className="text-sm text-zinc-500 sm:text-base">
                            Discover our curated selection of premium properties, ready for you to call home.
                        </p>
                    </div>
                    <div className="group/slider relative">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="-ml-[2px] flex gap-4 lg:gap-6">
                                {featuredProperties.map((property) => (
                                    <div key={property.id} className="min-w-0 flex-[0_0_100%] pl-[2px] md:flex-[0_0_50%] lg:flex-[0_0_33.333333%]">
                                        <article className="group relative aspect-[4/3] cursor-pointer overflow-hidden">
                                            <img
                                                src={property.image_path?.startsWith('http') ? property.image_path : `${property.image_path}`}
                                                alt={property.title}
                                                className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                                                loading="lazy"
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                                            <div className="pointer-events-none absolute bottom-0 left-0 w-full p-8 text-left">
                                                <h3 className="mb-2 text-2xl font-bold text-white">{Number(property.price).toLocaleString('en-us')}{currencySym}</h3>
                                                <p className="mb-4 line-clamp-1 text-sm font-semibold tracking-widest text-zinc-200 uppercase">
                                                    {property.title}
                                                </p>

                                                {property.type !== 'plot' ? (
                                                    <div className="flex items-center space-x-3 text-xs font-medium tracking-wider text-zinc-300 uppercase">
                                                        <span>{property.beds}BD</span>
                                                        <span className="h-3 w-[1px] bg-zinc-500"></span>
                                                        <span>{property.baths}BA</span>
                                                        <span className="h-3 w-[1px] bg-zinc-500"></span>
                                                        <span>{property.sqft} SF</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-3 text-xs font-medium tracking-wider text-zinc-300 uppercase">
                                                        <span>PLOT</span>
                                                        <span className="h-3 w-[1px] bg-zinc-500"></span>
                                                        <span>{property.sqft} SF</span>
                                                    </div>
                                                )}
                                            </div>

                                            <Link href={route('properties.show', property.id)} className="absolute inset-0 z-10">
                                                <span className="sr-only">View Details</span>
                                            </Link>
                                        </article>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={scrollPrev}
                            className="absolute top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-zinc-900 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover/slider:opacity-100 hover:bg-white focus:outline-none md:left-8"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-zinc-900 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover/slider:opacity-100 hover:bg-white focus:outline-none md:right-8"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </section>

            {/* 5. Client Testimonials Area */}
            <section className="bg-white py-20 transition-colors duration-300 dark:bg-zinc-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-16 max-w-3xl space-y-3 text-center">
                        <span className="text-sm font-extrabold tracking-wider text-orange-600 uppercase">Testimonials</span>
                        <h2 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl dark:text-white">What Our Clients Say</h2>
                        <p className="text-sm text-zinc-500 sm:text-base">
                            Read testimonies from families and firms who purchased their homes through Venture Builders.
                        </p>
                    </div>

                    {testimonials.length > 0 ? (
                        <div className="group/testimonial-slider relative">
                            <div className="overflow-hidden" ref={testimonialEmblaRef}>
                                <div className="-ml-4 flex gap-4">
                                    {testimonials.map((t) => (
                                        <div key={t.id} className="min-w-0 flex-[0_0_100%] pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333333%]">
                                            <div className="relative space-y-6 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-900 h-full flex flex-col justify-between">
                                                <Quote className="absolute top-8 right-8 h-10 w-10 text-orange-500/20" />
                                                <p className="text-sm leading-relaxed text-zinc-650 italic dark:text-zinc-300 flex-grow">
                                                    "{t.content}"
                                                </p>
                                                <div className="flex items-center gap-3 pt-4 border-t border-zinc-205/60 dark:border-zinc-800/60">
                                                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                                                        {t.image_path ? (
                                                            <img
                                                                src={t.image_path.startsWith('http') ? t.image_path : `${t.image_path}`}
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
                                                        <span className="text-xs text-zinc-405">{t.role}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial arrows */}
                            {testimonials.length > 1 && (
                                <>
                                    <button
                                        onClick={scrollTestimonialPrev}
                                        className="absolute top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-zinc-900 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover/testimonial-slider:opacity-100 hover:bg-white focus:outline-none md:-left-6"
                                        aria-label="Previous testimonial"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={scrollTestimonialNext}
                                        className="absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-zinc-900 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover/testimonial-slider:opacity-100 hover:bg-white focus:outline-none md:-right-6"
                                        aria-label="Next testimonial"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-zinc-400">
                            <Quote className="mx-auto mb-3 h-12 w-12 opacity-30" />
                            <p>No testimonials available.</p>
                        </div>
                    )}

                    {testimonials.length > 0 && (
                        <div className="mt-12 text-center">
                            <Link
                                href={route('testimonials')}
                                className="inline-flex items-center gap-1.5 font-bold text-orange-500 hover:text-orange-600 transition-colors"
                            >
                                <span>View All Client Reviews</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* 6. Quotation Callout Banner */}
            <section className="relative overflow-hidden bg-orange-600 py-16 text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80')" }}
                />
                <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:px-8">
                    <div className="max-w-xl space-y-2 text-center lg:text-left">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Get a Free Quotation Today!</h2>
                        <p className="text-sm text-orange-100 sm:text-base">
                            Have specific architectural designs or locations in mind? Send our development team your project ideas.
                        </p>
                    </div>

                    <div className="flex shrink-0 flex-col items-center gap-6 sm:flex-row">
                        <div className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/20 px-6 py-4 sm:w-auto">
                            <div className="rounded-xl bg-white p-3 text-orange-600">
                                <Phone className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                                <span className="block text-xs font-bold tracking-wider text-orange-200 uppercase">Say Hello</span>
                                <span className="block text-lg font-black tracking-tight">{settings?.contact_phone || '+001 325 589'}</span>
                            </div>
                        </div>
                        <Link
                            href={route('contact')}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-center font-bold text-orange-600 shadow-lg transition-all hover:bg-zinc-100 active:scale-[0.98] sm:w-auto"
                        >
                            <MessageSquare className="h-4 w-4" />
                            <span>Contact Us</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 7. Latest News / Blog Section */}
            <section className="bg-zinc-50 py-20 transition-colors duration-300 dark:bg-zinc-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-16 max-w-3xl space-y-3 text-center">
                        <span className="text-sm font-extrabold tracking-wider text-orange-600 uppercase">Market Insights</span>
                        <h2 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl dark:text-white">Our Latest News</h2>
                        <p className="text-sm text-zinc-500 sm:text-base">
                            Stay up-to-date with property investments, smart technology trends, and advice on buying your first flat.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
                        {latestNews.map((post) => (
                            <article
                                key={post.id}
                                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:border-orange-500/20 hover:shadow-md dark:bg-zinc-950 dark:hover:border-orange-500/20"
                            >
                                <div className="bg-zinc-150 relative aspect-[16/9] shrink-0 overflow-hidden">
                                    <img
                                        src={post.image_path?.startsWith('http') ? post.image_path : `${post.image_path}`}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                                        loading="lazy"
                                    />
                                    <span className="absolute top-4 left-4 rounded-lg bg-orange-600 px-3 py-1 text-xs font-bold text-white">
                                        {post.category}
                                    </span>
                                </div>

                                <div className="flex flex-grow flex-col justify-between space-y-4 p-6">
                                    <div className="space-y-2">
                                        <div className="flex gap-3 text-xs font-bold text-zinc-400">
                                            <span>By {post.author}</span>
                                            <span>•</span>
                                            <span>
                                                {new Date(post.published_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        <h3 className="line-clamp-2 text-lg leading-tight font-extrabold text-zinc-900 transition-colors group-hover:text-orange-600 sm:text-xl dark:text-white">
                                            {post.title}
                                        </h3>
                                        <p className="line-clamp-3 text-sm leading-relaxed text-zinc-550 dark:text-zinc-400">{post.excerpt}</p>
                                    </div>

                                    <Link
                                        href={route('blog.show', post.id)}
                                        className="group/link inline-flex items-center gap-1 self-start text-sm font-bold text-orange-600 transition-colors hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400"
                                    >
                                        <span>Read article</span>
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
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
