import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Trash2, Mail, Phone, Calendar, Send, MessageSquare, User, CheckCircle2, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Swal from 'sweetalert2';

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    verified: boolean;
    created_at: string;
}

interface ContactIndexProps {
    messages: ContactMessage[];
}

function ReplyForm({ message, onClose }: { message: ContactMessage; onClose: () => void }) {
    const { data, setData, post, processing, errors } = useForm({
        reply_message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.contact.reply', message.id), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({ icon: 'success', title: 'Reply Sent!', text: `Your reply was sent to ${message.email}.`, timer: 2500, showConfirmButton: false });
                onClose();
            },
            onError: () => Swal.fire({ icon: 'error', title: 'Oops...', text: 'Failed to send reply.' }),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Original message preview */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{message.name}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{message.email}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{message.message}</p>
            </div>

            <div className="space-y-1">
                <Label>Your Reply</Label>
                <textarea
                    rows={6}
                    value={data.reply_message}
                    onChange={e => setData('reply_message', e.target.value)}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    placeholder="Write your reply to the client..."
                />
                {errors.reply_message && <p className="text-xs text-red-500">{errors.reply_message}</p>}
            </div>

            <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                <Button type="submit" disabled={processing} className="gap-2">
                    <Send className="w-4 h-4" /> Send Reply
                </Button>
            </DialogFooter>
        </form>
    );
}

export default function ContactIndex({ messages }: ContactIndexProps) {
    const [search, setSearch] = useState('');
    const [replyMessage, setReplyMessage] = useState<ContactMessage | null>(null);
    const [viewMessage, setViewMessage] = useState<ContactMessage | null>(null);

    const filtered = messages.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        m.message.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (msg: ContactMessage) => {
        Swal.fire({
            title: 'Delete Message?',
            text: `Message from "${msg.name}" will be permanently deleted.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
        }).then(result => {
            if (result.isConfirmed) {
                router.delete(route('admin.contact.destroy', msg.id), {
                    preserveScroll: true,
                    onSuccess: () => Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Message removed.', timer: 2000, showConfirmButton: false }),
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Contact Messages" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Contact Inbox</h2>
                        <p className="text-muted-foreground">{messages.length} verified messages</p>
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search by name, email or message..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
                    {search && (
                        <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="space-y-3">
                    {filtered.map(msg => (
                        <Card key={msg.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-1 min-w-0">
                                        {/* Avatar */}
                                        <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 font-bold text-sm shrink-0">
                                            {msg.name[0].toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                                <span className="font-bold text-sm">{msg.name}</span>
                                                {msg.verified && (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                                                        <CheckCircle2 className="w-3 h-3" /> Verified
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1.5">
                                                    <Mail className="w-3.5 h-3.5" /> {msg.email}
                                                </span>
                                                {msg.phone && (
                                                    <span className="flex items-center gap-1.5">
                                                        <Phone className="w-3.5 h-3.5" /> {msg.phone}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{msg.message}</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 shrink-0">
                                        <Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs" onClick={() => setViewMessage(msg)}>
                                            <MessageSquare className="w-3.5 h-3.5" /> View
                                        </Button>
                                        <Button size="sm" className="gap-1.5 h-8 text-xs" onClick={() => setReplyMessage(msg)}>
                                            <Send className="w-3.5 h-3.5" /> Reply
                                        </Button>
                                        <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => handleDelete(msg)}>
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            <Mail className="w-14 h-14 mx-auto mb-4 opacity-20" />
                            <p className="font-medium">No messages yet.</p>
                            <p className="text-sm mt-1">Verified contact form submissions will appear here.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* View Full Message Dialog */}
            <Dialog open={!!viewMessage} onOpenChange={open => !open && setViewMessage(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Message from {viewMessage?.name}</DialogTitle>
                    </DialogHeader>
                    {viewMessage && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="space-y-0.5">
                                    <p className="text-xs text-muted-foreground uppercase font-bold">Email</p>
                                    <p>{viewMessage.email}</p>
                                </div>
                                {viewMessage.phone && (
                                    <div className="space-y-0.5">
                                        <p className="text-xs text-muted-foreground uppercase font-bold">Phone</p>
                                        <p>{viewMessage.phone}</p>
                                    </div>
                                )}
                                <div className="space-y-0.5">
                                    <p className="text-xs text-muted-foreground uppercase font-bold">Received</p>
                                    <p>{new Date(viewMessage.created_at).toLocaleString('en-US')}</p>
                                </div>
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-xs text-muted-foreground uppercase font-bold">Message</p>
                                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm leading-relaxed whitespace-pre-line">
                                    {viewMessage.message}
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setViewMessage(null)}>Close</Button>
                                <Button className="gap-2" onClick={() => { setViewMessage(null); setReplyMessage(viewMessage); }}>
                                    <Send className="w-4 h-4" /> Reply
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Reply Dialog */}
            <Dialog open={!!replyMessage} onOpenChange={open => !open && setReplyMessage(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Reply to {replyMessage?.name}</DialogTitle>
                    </DialogHeader>
                    {replyMessage && <ReplyForm message={replyMessage} onClose={() => setReplyMessage(null)} />}
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
