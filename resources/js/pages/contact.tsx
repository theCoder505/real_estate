import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Contact() {
    // Lead generation or inquiry form
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contact.submit'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <PublicLayout>
            <Head title="Contact Us - Venture Builders" />

            {/* 1. Header Banner */}
            <section className="bg-zinc-900 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80')" }} 
                />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
                    <span className="text-orange-500 font-extrabold text-sm uppercase tracking-wider">Get In Touch</span>
                    <h1 className="text-4xl font-black tracking-tight">Contact Our Development Team</h1>
                    <p className="text-zinc-400 max-w-xl mx-auto text-xs sm:text-sm">
                        Have queries about construction quality, land titles, or available flats? Drop us a message.
                    </p>
                </div>
            </section>

            {/* 2. Contact Coordinates & Form */}
            <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Left: Contact Coordinates */}
                        <div className="lg:col-span-5 space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                                    We’d Love to Hear <br /> From You
                                </h2>
                                <p className="text-sm text-zinc-550 dark:text-zinc-400 leading-relaxed">
                                    Our brokerage desk is active Monday through Saturday from 9:00 AM to 6:00 PM. We will get back to your inquiry email within 24 hours.
                                </p>
                            </div>

                            {/* Info Blocks */}
                            <div className="space-y-6 text-sm text-zinc-700 dark:text-zinc-355">
                                <div className="flex gap-4 items-start">
                                    <div className="p-3 bg-orange-600/10 text-orange-600 rounded-xl shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-extrabold text-zinc-900 dark:text-white">Our Headquarters</h4>
                                        <p className="text-zinc-500">123 Venture Tower, Park Avenue Road, Manhattan, NY 10001</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="p-3 bg-orange-600/10 text-orange-600 rounded-xl shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-extrabold text-zinc-900 dark:text-white">Phone Support</h4>
                                        <p className="text-zinc-550 font-bold">+001 325 589 (Direct Desk)</p>
                                        <p className="text-zinc-500">Toll Free: +1 (800) 555-VENTURE</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="p-3 bg-orange-600/10 text-orange-600 rounded-xl shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-extrabold text-zinc-900 dark:text-white">Email Address</h4>
                                        <p className="text-zinc-550 font-bold">info@venturebuilders.com</p>
                                        <p className="text-zinc-500">support@venturebuilders.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="lg:col-span-7">
                            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 p-6 sm:p-8 rounded-3xl space-y-6">
                                <h3 className="font-extrabold text-zinc-900 dark:text-white text-xl">Send Us A Message</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Your Name</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-850 dark:text-zinc-200 outline-none focus:border-orange-500 transition-colors"
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
                                                className="w-full bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-850 dark:text-zinc-200 outline-none focus:border-orange-500 transition-colors"
                                            />
                                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Phone Number (Optional)</label>
                                        <input 
                                            type="text" 
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-850 dark:text-zinc-200 outline-none focus:border-orange-500 transition-colors"
                                        />
                                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Message</label>
                                        <textarea 
                                            required
                                            rows={5}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            placeholder="Write your details or specifications here..."
                                            className="w-full bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-850 dark:text-zinc-200 outline-none focus:border-orange-500 transition-colors resize-none"
                                        />
                                        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-orange-500/10 active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                        <Send className="w-4 h-4" />
                                        <span>Send Message</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Map Placeholder */}
            <section className="bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200/50 dark:border-zinc-850 h-96 w-full relative transition-colors">
                {/* Styled elegant map embed simulation (fully responsive) */}
                <iframe 
                    title="Venture Builders Location"
                    className="w-full h-full grayscale invert dark:invert-0 opacity-80"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d3022.4282500000003!2d-73.9875!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMTUuMCJX!5e0!3m2!1sen!2sus!4v1234567890123" 
                    allowFullScreen={false} 
                    loading="lazy"
                />
            </section>
        </PublicLayout>
    );
}
