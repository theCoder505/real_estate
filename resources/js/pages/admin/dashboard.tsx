import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Building2, BookOpen, Star, Mail, ArrowRight,
    TrendingUp, MapPin, MessageSquare, Eye,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

interface Stats {
    properties: number;
    blog_posts: number;
    facilities: number;
    testimonials: number;
    messages: number;
    featured: number;
}

interface Property {
    id: number;
    title: string;
    type: string;
    price: number | string;
    status: string;
    location?: string;
    image_path?: string;
}

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
    replied?: boolean;
}

interface Setting {
    currency_symbol?: string;
    currency_code?: string;
    brand_name?: string;
}

interface PageProps {
    settings?: Setting;
    [key: string]: unknown;
}

interface DashboardProps {
    stats: Stats;
    recentMessages: ContactMessage[];
    recentProperties: Property[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number | string): string {
    return Number(price).toLocaleString('en-us');
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

function initials(name: string): string {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

/** Safely resolve a Ziggy route — returns '#' if the route isn't registered. */
function safeRoute(name: string, params?: Record<string, unknown>): string {
    try {
        return params ? route(name, params) : route(name);
    } catch {
        return '#';
    }
}

// ── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
    label: string;
    value: number;
    sub: string;
    icon: React.ReactNode;
    gradient: string;
    accent: string;
}

function StatCard({ label, value, sub, icon, gradient, accent }: StatCardProps) {
    return (
        <div className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg ${gradient}`}>
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-20 ${accent}`} />
            <div className={`absolute -right-1 -bottom-6 w-16 h-16 rounded-full opacity-10 ${accent}`} />

            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-75 mb-1">{label}</p>
                    <p className="text-4xl font-black tracking-tight leading-none">{value}</p>
                    <p className="text-xs opacity-65 mt-2 font-medium">{sub}</p>
                </div>
                <div className="bg-white/15 rounded-xl p-2.5 backdrop-blur-sm">
                    {icon}
                </div>
            </div>
        </div>
    );
}

// ── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, string> = {
        available: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        sold:      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        rented:    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        featured:  'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    };
    const cls = map[status.toLowerCase()] ?? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400';
    return (
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${cls}`}>
            {status}
        </span>
    );
}

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-zinc-400 gap-3">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center opacity-60">
                {icon}
            </div>
            <p className="text-sm font-medium">{text}</p>
        </div>
    );
}

// ── Quick Action Item ─────────────────────────────────────────────────────────

interface QuickActionProps {
    label: string;
    routeName: string;
    icon: React.ReactNode;
    color: string;
}

function QuickAction({ label, routeName, icon, color }: QuickActionProps) {
    const href = safeRoute(routeName);
    // Hide the action entirely if the route isn't registered
    if (href === '#') return null;

    return (
        <Link
            href={href}
            className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-orange-300 dark:hover:border-orange-800 hover:shadow-sm transition-all group"
        >
            <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                {icon}
            </span>
            <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors leading-tight">
                {label}
            </span>
        </Link>
    );
}

// ── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard({ stats, recentMessages, recentProperties }: DashboardProps) {
    const s = stats ?? ({} as Stats);
    const { settings } = usePage<PageProps>().props;
    const currencySym = settings?.currency_symbol ?? '$';

    const quickActions: QuickActionProps[] = [
        { label: 'Add Property',   routeName: 'admin.properties.create', icon: <Building2 className="w-5 h-5" />, color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' },
        { label: 'New Blog Post',  routeName: 'admin.blog.create',       icon: <BookOpen className="w-5 h-5" />,  color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
        { label: 'View Inbox',     routeName: 'admin.contact.index',     icon: <Mail className="w-5 h-5" />,      color: 'text-violet-600 bg-violet-50 dark:bg-violet-900/20' },
        { label: 'All Properties', routeName: 'admin.properties.index',  icon: <Eye className="w-5 h-5" />,       color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
    ];

    const propertiesHref  = safeRoute('admin.properties.index');
    const contactHref     = safeRoute('admin.contact.index');

    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-8">

                {/* ── Page header ── */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1">Admin Panel</p>
                        <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Overview</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                            Here's what's happening across your portfolio today.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-900 rounded-xl px-4 py-2.5 font-medium border border-zinc-200 dark:border-zinc-800">
                        <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                        {new Date().toLocaleDateString('en-us', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                </div>

                {/* ── Stats grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StatCard
                        label="Properties"
                        value={s.properties ?? 0}
                        sub={`${s.featured ?? 0} featured`}
                        icon={<Building2 className="w-5 h-5" />}
                        gradient="bg-gradient-to-br from-orange-500 to-rose-600"
                        accent="bg-white"
                    />
                    <StatCard
                        label="Blog Posts"
                        value={s.blog_posts ?? 0}
                        sub="Published articles"
                        icon={<BookOpen className="w-5 h-5" />}
                        gradient="bg-gradient-to-br from-blue-500 to-indigo-700"
                        accent="bg-white"
                    />
                    <StatCard
                        label="Facilities"
                        value={s.facilities ?? 0}
                        sub="Available amenities"
                        icon={<Star className="w-5 h-5" />}
                        gradient="bg-gradient-to-br from-emerald-500 to-teal-700"
                        accent="bg-white"
                    />
                    <StatCard
                        label="Inbox"
                        value={s.messages ?? 0}
                        sub="Verified messages"
                        icon={<Mail className="w-5 h-5" />}
                        gradient="bg-gradient-to-br from-violet-500 to-purple-700"
                        accent="bg-white"
                    />
                </div>

                {/* ── Secondary highlight row ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                            <Building2 className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-zinc-900 dark:text-white">{s.featured ?? 0}</p>
                            <p className="text-xs text-zinc-500 font-semibold mt-0.5">Featured Listings</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center shrink-0">
                            <Star className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-zinc-900 dark:text-white">{s.testimonials ?? 0}</p>
                            <p className="text-xs text-zinc-500 font-semibold mt-0.5">Client Testimonials</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
                            <MessageSquare className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-zinc-900 dark:text-white">{s.messages ?? 0}</p>
                            <p className="text-xs text-zinc-500 font-semibold mt-0.5">Total Inquiries</p>
                        </div>
                    </div>
                </div>

                {/* ── Recent activity ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Recent Properties */}
                    <Card className="border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                            <div>
                                <CardTitle className="text-base font-bold">Recent Properties</CardTitle>
                                <p className="text-xs text-zinc-400 mt-0.5">Latest added listings</p>
                            </div>
                            {propertiesHref !== '#' && (
                                <Link
                                    href={propertiesHref}
                                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    View all <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            )}
                        </CardHeader>
                        <CardContent className="pt-4">
                            {recentProperties?.length > 0 ? (
                                <div className="space-y-3">
                                    {recentProperties.map((prop) => (
                                        <div
                                            key={prop.id}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
                                        >
                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                                                {prop.image_path ? (
                                                    <img
                                                        src={prop.image_path.startsWith('http') ? prop.image_path : `/${prop.image_path}`}
                                                        alt={prop.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Building2 className="w-5 h-5 text-zinc-400" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-sm text-zinc-900 dark:text-white truncate group-hover:text-orange-600 transition-colors">
                                                    {prop.title}
                                                </p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-xs text-zinc-400 capitalize">{prop.type}</span>
                                                    <span className="text-zinc-300 dark:text-zinc-700">·</span>
                                                    <span className="text-xs font-bold text-orange-600">{formatPrice(prop.price)} {currencySym}</span>
                                                </div>
                                                {prop.location && (
                                                    <p className="flex items-center gap-1 text-[11px] text-zinc-400 mt-0.5">
                                                        <MapPin className="w-3 h-3 shrink-0" />
                                                        <span className="truncate">{prop.location}</span>
                                                    </p>
                                                )}
                                            </div>

                                            <StatusBadge status={prop.status} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState icon={<Building2 className="w-8 h-8" />} text="No properties yet." />
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Messages */}
                    <Card className="border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                            <div>
                                <CardTitle className="text-base font-bold">Recent Messages</CardTitle>
                                <p className="text-xs text-zinc-400 mt-0.5">Latest verified inquiries</p>
                            </div>
                            {contactHref !== '#' && (
                                <Link
                                    href={contactHref}
                                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    View all <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            )}
                        </CardHeader>
                        <CardContent className="pt-4">
                            {recentMessages?.length > 0 ? (
                                <div className="space-y-3">
                                    {recentMessages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                                        >
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white text-xs font-black shrink-0">
                                                {initials(msg.name)}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="font-bold text-sm text-zinc-900 dark:text-white truncate">{msg.name}</p>
                                                    <span className="text-[10px] text-zinc-400 shrink-0 font-medium">
                                                        {timeAgo(msg.created_at)}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-zinc-400 truncate">{msg.email}</p>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                                                    {msg.message}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState icon={<Mail className="w-8 h-8" />} text="No messages yet." />
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* ── Quick actions ── */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Quick Actions</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {quickActions.map((action) => (
                            <QuickAction key={action.label} {...action} />
                        ))}
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}