import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, router } from '@inertiajs/react';
import { Mail, Search, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface Subscriber {
    id: number;
    email: string;
    created_at: string;
}

interface NewsletterIndexProps {
    subscribers: Subscriber[];
}

export default function NewsletterIndex({ subscribers }: NewsletterIndexProps) {
    const [search, setSearch] = useState('');

    const filtered = subscribers.filter(
        (s) => s.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (s: Subscriber) => {
        Swal.fire({
            title: 'Delete Subscriber?',
            text: `"${s.email}" will be removed from the newsletter list.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.newsletter.destroy', s.id), {
                    preserveScroll: true,
                    onSuccess: () =>
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'Subscriber has been removed.',
                            timer: 2000,
                            showConfirmButton: false,
                        }),
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Newsletter Management" />

            <div className="space-y-6 px-4 py-4 lg:px-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Newsletter Subscribers</h2>
                        <p className="text-muted-foreground">{subscribers.length} total subscribers</p>
                    </div>
                </div>

                <div className="relative">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input placeholder="Search subscribers by email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="border-b bg-zinc-50 dark:bg-zinc-900/50 text-zinc-550 dark:text-zinc-400 font-semibold">
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Subscribed At</th>
                                        <th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((s) => (
                                        <tr key={s.id} className="border-b last:border-0 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20">
                                            <td className="p-4 font-medium flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                                                <span>{s.email}</span>
                                            </td>
                                            <td className="p-4 text-muted-foreground">
                                                {new Date(s.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </td>
                                            <td className="p-4 text-right">
                                                <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => handleDelete(s)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="text-center py-12 text-muted-foreground">
                                                No subscribers found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
