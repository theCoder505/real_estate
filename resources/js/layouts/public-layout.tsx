import React, { useState } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import { SharedData } from '@/types';
import { Toaster } from 'react-hot-toast';
import FlashMessage from '@/components/flash-message';
import { Menu, X, Phone, Mail, MapPin, Send, Building2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface PublicLayoutProps {
    children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    const { auth, name } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Newsletter subscription form
    const { data, setData, post, processing, reset, errors } = useForm({
        email: '',
    });

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('subscribe'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const navLinks = [
        { label: 'Home', href: route('home') },
        { label: 'About', href: route('about') },
        { label: 'Facilities', href: route('facilities') },
        { label: 'Properties', href: route('properties.index') },
        { label: 'Blog', href: route('blog.index') },
        { label: 'Contact', href: route('contact') },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 selection:bg-orange-600 selection:text-white transition-colors duration-300">
            {/* React Hot Toaster and custom flash listener */}
            <Toaster />
            <FlashMessage />

            {/* Sticky Navigation Header */}
            <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-zinc-950/90 border-b border-zinc-200/50 dark:border-zinc-850/50 shadow-sm transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href={route('home')} className="flex items-center gap-2 group">
                        <div className="p-2.5 bg-orange-600 rounded-xl text-white group-hover:scale-105 transition-transform shadow-md shadow-orange-500/20">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-white group-hover:text-orange-600 transition-colors">
                            {name || 'Venture Builders'}
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`font-semibold text-sm transition-colors relative py-1 hover:text-orange-600 ${
                                    usePage().url === new URL(link.href).pathname
                                        ? 'text-orange-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-600'
                                        : 'text-zinc-600 dark:text-zinc-300'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Contact CTA button */}
                    <div className="hidden lg:block">
                        <Link
                            href={route('contact')}
                            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-orange-600 dark:hover:bg-orange-700 rounded-xl transition-all shadow-md active:scale-95"
                        >
                            Get A Quote
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Drawer (Absolute Slideout or block) */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-950 p-4 space-y-3 shadow-xl">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                                        usePage().url === new URL(link.href).pathname
                                            ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-600'
                                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex flex-col gap-3">
                            <span className="flex items-center gap-2 text-xs text-zinc-500 px-4">
                                <Phone className="w-4 h-4 text-orange-500" />
                                <span>+001 325 589</span>
                            </span>
                            <Link
                                href={route('contact')}
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full inline-flex items-center justify-center py-2.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-all"
                            >
                                Get A Quote
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Surface Page Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Global Public Footer */}
            <footer className="bg-zinc-900 text-zinc-350 dark:bg-zinc-980 dark:text-zinc-400 border-t border-zinc-850 pt-16 pb-8 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-orange-600 rounded-xl text-white">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <span className="font-extrabold text-lg text-white">
                                {name || 'Venture Builders'}
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-400">
                            We design, build, and deliver dream apartments, premium plots, and family flats with high standards of architecture, safety, and modern comfort.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-zinc-800 rounded-lg hover:bg-orange-600 hover:text-white transition-colors" aria-label="Facebook">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-zinc-800 rounded-lg hover:bg-orange-600 hover:text-white transition-colors" aria-label="Twitter">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-zinc-800 rounded-lg hover:bg-orange-600 hover:text-white transition-colors" aria-label="Instagram">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-zinc-800 rounded-lg hover:bg-orange-600 hover:text-white transition-colors" aria-label="LinkedIn">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-white text-base relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-orange-500 pb-2">
                            Contact Info
                        </h3>
                        <ul className="space-y-4 text-sm text-zinc-400">
                            <li className="flex gap-3 items-start">
                                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                <span>123 Venture Tower, Park Avenue Road, Manhattan, NY 10001</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                                <span>+001 325 589</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                                <span>info@venturebuilders.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Navigation Quick Links */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-white text-base relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-orange-500 pb-2">
                            Important Links
                        </h3>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-zinc-400">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="hover:text-orange-500 transition-colors flex items-center gap-1">
                                        <span className="text-orange-500 font-bold">&#8250;</span> {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href={route('privacy')} className="hover:text-orange-500 transition-colors flex items-center gap-1">
                                    <span className="text-orange-500 font-bold">&#8250;</span> Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href={route('terms')} className="hover:text-orange-500 transition-colors flex items-center gap-1">
                                    <span className="text-orange-500 font-bold">&#8250;</span> Terms
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Form */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-white text-base relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-orange-500 pb-2">
                            Newsletter
                        </h3>
                        <p className="text-sm text-zinc-400">
                            Subscribe to receive notifications about premium new properties and market insights.
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-2">
                            <div className="relative flex rounded-xl overflow-hidden shadow-inner bg-zinc-800 border border-zinc-700/80 focus-within:border-orange-500/50 transition-colors">
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full bg-transparent text-sm py-3 px-4 outline-none border-none text-white placeholder-zinc-500 focus:ring-0"
                                    disabled={processing}
                                />
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="p-3 bg-orange-600 hover:bg-orange-700 text-white transition-colors flex items-center justify-center shrink-0 disabled:opacity-50"
                                    aria-label="Subscribe"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Subfooter */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-zinc-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
                    <p>
                        &copy; {new Date().getFullYear()} {name || 'Venture Builders'}. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href={route('privacy')} className="hover:text-zinc-400 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href={route('terms')} className="hover:text-zinc-400 transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
