import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Search, MapPin, BedDouble, Bath, Square, ArrowRight, SlidersHorizontal, RotateCcw } from 'lucide-react';

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

interface Filters {
    search?: string;
    type?: string;
    price_max?: string;
}

interface PropertiesProps {
    properties: Property[];
    filters: Filters;
}

export default function Index({ properties, filters }: PropertiesProps) {
    const { settings } = usePage<any>().props;
    const currencySym = settings?.currency_symbol || '$';

    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || 'all');
    const [priceMax, setPriceMax] = useState(filters.price_max || '');

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const applyFilters = (updatedType = type) => {
        router.get(
            route('properties.index'),
            {
                search,
                type: updatedType,
                price_max: priceMax,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleTypeChange = (newType: string) => {
        setType(newType);
        // Directly apply filters on type click to make UX smooth
        router.get(
            route('properties.index'),
            {
                search,
                type: newType,
                price_max: priceMax,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const resetFilters = () => {
        setSearch('');
        setType('all');
        setPriceMax('');
        router.get(
            route('properties.index'),
            {},
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const typeTabs = [
        { value: 'all', label: 'All Listings' },
        { value: 'apartment', label: 'Apartments' },
        { value: 'flat', label: 'Flats' },
        { value: 'plot', label: 'Land Plots' },
    ];

    return (
        <PublicLayout>
            <Head title="Properties Portfolio - Venture Builders" />

            {/* 1. Page Header */}
            <section className="bg-zinc-900 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80')" }}
                />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
                    <span className="text-orange-500 font-extrabold text-sm uppercase tracking-wider">Our Portfolio</span>
                    <h1 className="text-4xl font-black tracking-tight">Apartments, Flats & Plots</h1>
                    <p className="text-zinc-400 max-w-xl mx-auto text-xs sm:text-sm">
                        Use the filters below to find residential spaces matching your budget, location, and dimensions.
                    </p>
                </div>
            </section>

            {/* 2. Filter Bar and Listings */}
            <section className="py-12 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    {/* Interactive Filter Panel */}
                    <div className="bg-zinc-50 dark:bg-zinc-900  p-6 rounded-3xl shadow-sm">
                        <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                            {/* Search bar */}
                            <div className="md:col-span-5 space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Search Location / Title</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="e.g. Miami, Austin, flat..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-850 dark:text-zinc-200 outline-none focus:border-orange-500 transition-colors"
                                    />
                                    <Search className="w-4.5 h-4.5 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>

                            {/* Max Price */}
                            <div className="md:col-span-4 space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Max Budget ({currencySym})</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 500000"
                                    value={priceMax}
                                    onChange={(e) => setPriceMax(e.target.value)}
                                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-850 dark:text-zinc-200 outline-none focus:border-orange-500 transition-colors"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="md:col-span-3 flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-grow py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-orange-500/10 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    <span>Filter</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="px-4 py-3 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300 rounded-xl transition-all flex items-center justify-center active:scale-95 cursor-pointer"
                                    title="Reset Filters"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                            </div>
                        </form>

                        {/* Category filter tabs */}
                        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50">
                            {typeTabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    type="button"
                                    onClick={() => handleTypeChange(tab.value)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${type === tab.value
                                            ? 'bg-orange-600 border-orange-600 text-white shadow-sm'
                                            : 'bg-white border-zinc-200/80 text-zinc-650 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-350 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Properties Grid */}
                    {properties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {properties.map((property) => (
                                <article
                                    key={property.id}
                                    className="bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden  shadow-sm hover:shadow-md hover:border-orange-500/20 dark:hover:border-orange-500/20 transition-all duration-300 group"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                                        <img
                                            src={property.image_path?.startsWith('http') ? property.image_path : `${property.image_path}`}
                                            alt={property.title}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow">
                                            {property.status}
                                        </span>
                                        <span className="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur-sm text-zinc-100 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">
                                            {property.type}
                                        </span>
                                        <div className="absolute bottom-4 left-4 bg-zinc-900/90 backdrop-blur-sm text-orange-400 font-extrabold text-lg px-4 py-1.5 rounded-xl">
                                            {Number(property.price).toLocaleString('en-us')}{currencySym}
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
                    ) : (
                        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-md mx-auto space-y-4">
                            <SlidersHorizontal className="w-12 h-12 text-zinc-400 mx-auto" />
                            <div className="space-y-1">
                                <h3 className="font-bold text-lg text-zinc-900 dark:text-white">No properties found</h3>
                                <p className="text-sm text-zinc-500">Try adjusting your filters or keyword searches.</p>
                            </div>
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 bg-orange-600 text-white font-bold text-xs rounded-lg hover:bg-orange-700 transition-colors uppercase tracking-wider"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
