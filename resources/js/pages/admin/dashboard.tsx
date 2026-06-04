import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, BookOpen, Star, Mail, Users, ArrowRight } from 'lucide-react';

interface DashboardProps {
    stats: {
        properties: number;
        blog_posts: number;
        facilities: number;
        testimonials: number;
        messages: number;
        featured: number;
    };
    recentMessages: any[];
    recentProperties: any[];
}

export default function Dashboard({ stats, recentMessages, recentProperties }: DashboardProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                    <p className="text-muted-foreground">Welcome to the admin dashboard.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-gradient-to-br from-orange-600 to-rose-600 text-white shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium opacity-80 flex items-center gap-2">
                                <Building2 className="w-4 h-4" /> Properties
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold">{stats?.properties || 0}</div>
                            <p className="text-xs opacity-70 mt-1">{stats?.featured || 0} featured properties</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium opacity-80 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" /> Blog Posts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold">{stats?.blog_posts || 0}</div>
                            <p className="text-xs opacity-70 mt-1">Published news & articles</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium opacity-80 flex items-center gap-2">
                                <Star className="w-4 h-4" /> Facilities
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold">{stats?.facilities || 0}</div>
                            <p className="text-xs opacity-70 mt-1">Available amenities</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium opacity-80 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Inbox
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold">{stats?.messages || 0}</div>
                            <p className="text-xs opacity-70 mt-1">Verified contact messages</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    {/* Recent Properties */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg">Recent Properties</CardTitle>
                            <Link href={route('admin.properties.index')} className="text-sm text-orange-600 hover:underline flex items-center gap-1">
                                View all <ArrowRight className="w-4 h-4" />
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 mt-4">
                                {recentProperties?.length > 0 ? recentProperties.map((prop: any) => (
                                    <div key={prop.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-semibold text-sm truncate max-w-[200px] sm:max-w-xs">{prop.title}</p>
                                            <p className="text-xs text-muted-foreground">{prop.type} • ${Number(prop.price).toLocaleString()}</p>
                                        </div>
                                        <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md font-medium">
                                            {prop.status}
                                        </span>
                                    </div>
                                )) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">No properties found.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Messages */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg">Recent Messages</CardTitle>
                            <Link href={route('admin.contact.index')} className="text-sm text-orange-600 hover:underline flex items-center gap-1">
                                View all <ArrowRight className="w-4 h-4" />
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 mt-4">
                                {recentMessages?.length > 0 ? recentMessages.map((msg: any) => (
                                    <div key={msg.id} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                                        <div className="flex-1 min-w-0 pr-4">
                                            <p className="font-semibold text-sm truncate">{msg.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{msg.email}</p>
                                            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-1">{msg.message}</p>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">
                                            {new Date(msg.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                )) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">No new messages.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
