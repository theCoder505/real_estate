import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ChevronRight, Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';

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

interface ShowProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

export default function Show({ post, relatedPosts }: ShowProps) {
    return (
        <PublicLayout>
            <Head title={`${post.title} - Venture Builders Blog`} />

            {/* 1. Breadcrumbs */}
            <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200/50 dark:border-zinc-800/50 py-4 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-550 dark:text-zinc-400">
                    <Link href={route('home')} className="hover:text-orange-500 transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                    <Link href={route('blog.index')} className="hover:text-orange-500 transition-colors">Blog</Link>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                    <span className="text-zinc-800 dark:text-white line-clamp-1">{post.title}</span>
                </div>
            </div>

            {/* 2. Main Article Section */}
            <section className="py-12 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left: Article Body */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Category Badge */}
                            <span className="inline-block bg-orange-100 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                                {post.category}
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white leading-tight">
                                {post.title}
                            </h1>

                            {/* Metadata */}
                            <div className="flex flex-wrap items-center gap-4 text-zinc-500 text-xs font-bold border-y border-zinc-100 dark:border-zinc-900 py-3">
                                <span className="flex items-center gap-1.5">
                                    <User className="w-4.5 h-4.5 text-orange-500" />
                                    <span>By {post.author}</span>
                                </span>
                                <span className="text-zinc-300">|</span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4.5 h-4.5 text-orange-500" />
                                    <span>{new Date(post.date).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</span>
                                </span>
                            </div>

                            {/* Banner Image */}
                            <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-100">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                            </div>

                            {/* Article Content */}
                            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base whitespace-pre-line pt-4">
                                {post.content}
                            </div>

                            {/* Back Navigation Button */}
                            <div className="pt-8 border-t border-zinc-150 dark:border-zinc-900">
                                <Link 
                                    href={route('blog.index')}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-zinc-800 dark:text-zinc-250 font-bold text-sm rounded-xl transition-all"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Back to Blog</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right: Related Articles Sidebar */}
                        {relatedPosts.length > 0 && (
                            <div className="lg:col-span-4 space-y-6">
                                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 p-6 sm:p-8 rounded-3xl space-y-6">
                                    <h3 className="font-extrabold text-zinc-900 dark:text-white text-lg relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-6 after:h-0.5 after:bg-orange-500 pb-2">
                                        Related Articles
                                    </h3>
                                    <div className="space-y-6">
                                        {relatedPosts.map((related) => (
                                            <article key={related.id} className="group space-y-2.5">
                                                <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-100">
                                                    <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] bg-zinc-200 text-zinc-650 dark:bg-zinc-800 dark:text-zinc-300 px-2 py-0.5 rounded font-bold uppercase">
                                                        {related.category}
                                                    </span>
                                                    <Link 
                                                        href={route('blog.show', related.id)}
                                                        className="block font-bold text-zinc-900 dark:text-white text-sm line-clamp-2 hover:text-orange-600 dark:hover:text-orange-500 transition-colors leading-snug"
                                                    >
                                                        {related.title}
                                                    </Link>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
