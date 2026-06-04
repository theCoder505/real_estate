import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ChevronRight, ArrowRight } from 'lucide-react';

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

interface IndexProps {
    posts: BlogPost[];
}

export default function Index({ posts }: IndexProps) {
    return (
        <PublicLayout>
            <Head title="Real Estate Insights & News - Venture Builders" />

            {/* 1. Header Banner */}
            <section className="bg-zinc-900 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80')" }}
                />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
                    <span className="text-orange-500 font-extrabold text-sm uppercase tracking-wider">News & Insights</span>
                    <h1 className="text-4xl font-black tracking-tight">The Venture Builders Blog</h1>
                    <p className="text-zinc-400 max-w-xl mx-auto text-xs sm:text-sm">
                        Stay informed about housing market trends, tips for first-time buyers, and the evolution of smart homes.
                    </p>
                </div>
            </section>

            {/* 2. Blog Grid */}
            <section className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden  shadow-sm hover:shadow-md hover:border-orange-500/20 dark:hover:border-orange-500/20 transition-all duration-300 group flex flex-col h-full"
                                >
                                    <div className="relative aspect-[16/9] overflow-hidden bg-zinc-150 shrink-0">
                                        <img
                                            src={post.image_path}
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
                                                <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                            <h3 className="font-extrabold text-lg sm:text-xl text-zinc-900 dark:text-white line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-zinc-550 dark:text-zinc-400 line-clamp-3 leading-relaxed">
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
                    ) : (
                        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-3xl max-w-sm mx-auto">
                            <h3 className="font-bold text-zinc-900 dark:text-white">No articles published yet</h3>
                            <p className="text-sm text-zinc-500 mt-2">Check back later for news articles.</p>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
