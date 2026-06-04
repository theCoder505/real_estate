import FlashMessage from '@/components/flash-message';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Building2, Facebook, Instagram, Linkedin, Mail, MapPin, Menu, Moon, Phone, Send, Sun, Twitter, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

interface PublicLayoutProps {
    children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    const { auth, settings } = usePage<any>().props;
    const { url } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme === 'dark') {
                document.documentElement.classList.add('dark');
                setTheme('dark');
            } else if (storedTheme === 'light') {
                document.documentElement.classList.remove('dark');
                setTheme('light');
            } else {
                // Fallback to check if dark class is already present (e.g. from server render)
                const isDark = document.documentElement.classList.contains('dark');
                setTheme(isDark ? 'dark' : 'light');
            }
        }
    }, []);

    const toggleTheme = () => {
        if (theme === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setTheme('light');
        }
    };

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
        <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 transition-colors duration-300 selection:bg-orange-600 selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
            {/* React Hot Toaster and custom flash listener */}
            <Toaster />
            <FlashMessage />

            {/* Sticky Navigation Header */}
            <header className="sticky top-0 z-40 w-full bg-white/90 shadow-sm backdrop-blur-md transition-colors duration-300 dark:bg-zinc-950/90">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href={route('home')} className="group flex items-center gap-2">
                        <img src="/assets/images/logo.png" alt="Img" className='w-12' />
                        <span className="text-xl font-extrabold tracking-tight text-zinc-900 transition-colors group-hover:text-orange-600 dark:text-white">
                            {settings?.company_name || 'Venture Builders'}
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden items-center gap-8 lg:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`relative py-1 text-sm font-semibold transition-colors hover:text-orange-600 ${
                                    url === new URL(link.href).pathname
                                        ? 'text-orange-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-orange-600 after:content-[""]'
                                        : 'text-zinc-600 dark:text-zinc-300'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Contact CTA & Theme toggle */}
                    <div className="hidden items-center gap-4 lg:flex">
                        <button
                            onClick={toggleTheme}
                            className="rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <Link
                            href={route('contact')}
                            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-zinc-800 active:scale-95 dark:bg-orange-600 dark:hover:bg-orange-700"
                        >
                            Get A Quote
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            onClick={toggleTheme}
                            className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="dark:border-zinc-850/50 absolute top-full right-0 left-0 flex h-[calc(100vh-80px)] w-full flex-col overflow-y-auto border-b border-zinc-200/50 bg-white shadow-xl lg:hidden dark:bg-zinc-950/95">
                        <div className="space-y-3 p-4">
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block rounded-lg px-4 py-3 text-lg font-bold transition-all ${
                                            url === new URL(link.href).pathname
                                                ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/30'
                                                : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-4 flex flex-col gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-900">
                                <span className="flex items-center gap-2 px-4 text-sm text-zinc-500">
                                    <Phone className="h-5 w-5 text-orange-500" />
                                    <span>{settings?.contact_phone || '+001 325 589'}</span>
                                </span>
                                <Link
                                    href={route('contact')}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="inline-flex w-full items-center justify-center rounded-xl bg-orange-600 py-4 text-sm font-bold text-white transition-all hover:bg-orange-700"
                                >
                                    Get A Quote
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Surface Page Content */}
            <main className="flex-grow">{children}</main>

            {/* Global Public Footer */}
            <footer className="relative bg-zinc-950 pt-16 pb-8 text-zinc-400 transition-colors duration-300 dark:bg-black dark:text-zinc-400">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-[url('/assets/images/splash1.jpg')] bg-cover bg-center bg-no-repeat opacity-10"></div>

                {/* Content wrapper with relative positioning */}
                <div className="relative z-10">
                    <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
                        {/* Brand Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="rounded-xl bg-orange-600 p-2 text-white">
                                    <Building2 className="h-5 w-5" />
                                </div>
                                <span className="text-lg font-extrabold text-white">{settings?.company_name || 'Venture Builders'}</span>
                            </div>
                            <p className="text-sm leading-relaxed text-zinc-400">
                                We design, build, and deliver dream apartments, premium plots, and family flats with high standards of architecture,
                                safety, and modern comfort.
                            </p>
                            <div className="flex gap-4">
                                {settings?.facebook_url && (
                                    <a
                                        href={settings.facebook_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-lg bg-zinc-800 p-2 transition-colors hover:bg-orange-600 hover:text-white"
                                        aria-label="Facebook"
                                    >
                                        <Facebook className="h-4 w-4" />
                                    </a>
                                )}
                                {settings?.twitter_url && (
                                    <a
                                        href={settings.twitter_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-lg bg-zinc-800 p-2 transition-colors hover:bg-orange-600 hover:text-white"
                                        aria-label="Twitter"
                                    >
                                        <Twitter className="h-4 w-4" />
                                    </a>
                                )}
                                {settings?.instagram_url && (
                                    <a
                                        href={settings.instagram_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-lg bg-zinc-800 p-2 transition-colors hover:bg-orange-600 hover:text-white"
                                        aria-label="Instagram"
                                    >
                                        <Instagram className="h-4 w-4" />
                                    </a>
                                )}
                                {settings?.linkedin_url && (
                                    <a
                                        href={settings.linkedin_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-lg bg-zinc-800 p-2 transition-colors hover:bg-orange-600 hover:text-white"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin className="h-4 w-4" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h3 className="relative pb-2 text-base font-bold text-white after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:w-8 after:bg-orange-500 after:content-['']">
                                Contact Info
                            </h3>
                            <ul className="space-y-4 text-sm text-zinc-400">
                                <li className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                                    <span>{settings?.contact_address || '123 Venture Tower, Park Avenue Road, Manhattan, NY 10001'}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 shrink-0 text-orange-500" />
                                    <span>{settings?.contact_phone || '+001 325 589'}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 shrink-0 text-orange-500" />
                                    <span>{settings?.contact_email || 'info@venturebuilders.com'}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Navigation Quick Links */}
                        <div className="space-y-6">
                            <h3 className="relative pb-2 text-base font-bold text-white after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:w-8 after:bg-orange-500 after:content-['']">
                                Important Links
                            </h3>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-zinc-400">
                                {navLinks.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="flex items-center gap-1 transition-colors hover:text-orange-500">
                                            <span className="font-bold text-orange-500">&#8250;</span> {link.label}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link href={route('privacy')} className="flex items-center gap-1 transition-colors hover:text-orange-500">
                                        <span className="font-bold text-orange-500">&#8250;</span> Privacy
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('terms')} className="flex items-center gap-1 transition-colors hover:text-orange-500">
                                        <span className="font-bold text-orange-500">&#8250;</span> Terms
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter Form */}
                        <div className="space-y-6">
                            <h3 className="relative pb-2 text-base font-bold text-white after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:w-8 after:bg-orange-500 after:content-['']">
                                Newsletter
                            </h3>
                            <p className="text-sm text-zinc-400">
                                Subscribe to receive notifications about premium new properties and market insights.
                            </p>
                            <form onSubmit={handleSubscribe} className="space-y-2">
                                <div className="relative flex overflow-hidden rounded-xl border border-zinc-700/80 bg-zinc-800 shadow-inner transition-colors focus-within:border-orange-500/50">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full border-none bg-transparent px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:ring-0"
                                        disabled={processing}
                                    />
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex shrink-0 items-center justify-center bg-orange-600 p-3 text-white transition-colors hover:bg-orange-700 disabled:opacity-50"
                                        aria-label="Subscribe"
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </div>
                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                            </form>
                        </div>
                    </div>

                    {/* Subfooter */}
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-zinc-800 px-4 pt-8 text-center text-xs text-zinc-500 sm:px-6 md:flex-row md:text-left lg:px-8">
                        <p>
                            &copy; {new Date().getFullYear()} {settings?.company_name || 'Venture Builders'}. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link href={route('privacy')} className="transition-colors hover:text-zinc-400">
                                Privacy Policy
                            </Link>
                            <Link href={route('terms')} className="transition-colors hover:text-zinc-400">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
