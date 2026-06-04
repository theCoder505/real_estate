import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Quote, Search, X, Star } from 'lucide-react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/layouts/authenticated-layout';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    image_path: string;
    rating?: number;
}

interface TestimonialsIndexProps {
    testimonials: Testimonial[];
}

function TestimonialForm({
    initial,
    onSuccess,
    onCancel,
    mode,
}: {
    initial?: Partial<Testimonial>;
    onSuccess: () => void;
    onCancel: () => void;
    mode: 'create' | 'edit';
}) {
    const { data, setData, post, processing, errors } = useForm({
        _method: mode === 'edit' ? 'PUT' : 'POST',
        name: initial?.name || '',
        role: initial?.role || '',
        content: initial?.content || '',
        rating: initial?.rating?.toString() || '5',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = mode === 'edit'
            ? route('admin.testimonials.update', initial!.id)
            : route('admin.testimonials.store');
        post(url, {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({ icon: 'success', title: 'Done!', text: `Testimonial ${mode === 'edit' ? 'updated' : 'created'} successfully.`, timer: 2500, showConfirmButton: false });
                onSuccess();
            },
            onError: () => Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please check the form for errors.' }),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label>Client Name</Label>
                    <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="John Doe" />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-1">
                    <Label>Role / Designation</Label>
                    <Input value={data.role} onChange={e => setData('role', e.target.value)} placeholder="Home Buyer" />
                    {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
                </div>
                <div className="space-y-1">
                    <Label>Rating (1–5)</Label>
                    <select value={data.rating} onChange={e => setData('rating', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
                        {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{'★'.repeat(r)} ({r})</option>)}
                    </select>
                </div>
                <div className="space-y-1">
                    <Label>Photo</Label>
                    {initial?.image_path && (
                        <div className="mb-1 h-12 w-12 rounded-full overflow-hidden bg-zinc-100">
                            <img src={initial.image_path.startsWith('http') ? initial.image_path : `/${initial.image_path}`} alt={initial.name} className="h-full w-full object-cover" />
                        </div>
                    )}
                    <Input type="file" accept="image/*" onChange={e => setData('image', e.target.files?.[0] || null)} />
                    {mode === 'edit' && <p className="text-xs text-muted-foreground">Leave empty to keep existing photo</p>}
                </div>
                <div className="space-y-1 sm:col-span-2">
                    <Label>Testimonial Content</Label>
                    <textarea rows={4} value={data.content} onChange={e => setData('content', e.target.value)}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring resize-none"
                        placeholder="What did the client say..." />
                    {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={processing}>{mode === 'edit' ? 'Update Testimonial' : 'Add Testimonial'}</Button>
            </DialogFooter>
        </form>
    );
}

export default function TestimonialsIndex({ testimonials }: TestimonialsIndexProps) {
    const [search, setSearch] = useState('');
    const [createOpen, setCreateOpen] = useState(false);
    const [editTestimonial, setEditTestimonial] = useState<Testimonial | null>(null);

    const filtered = testimonials.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.role.toLowerCase().includes(search.toLowerCase()) ||
        t.content.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (t: Testimonial) => {
        Swal.fire({
            title: 'Delete Testimonial?',
            text: `Testimonial from "${t.name}" will be permanently deleted.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
        }).then(result => {
            if (result.isConfirmed) {
                router.delete(route('admin.testimonials.destroy', t.id), {
                    preserveScroll: true,
                    onSuccess: () => Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Testimonial removed.', timer: 2000, showConfirmButton: false }),
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Testimonials Management" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Testimonials</h2>
                        <p className="text-muted-foreground">{testimonials.length} total testimonials</p>
                    </div>
                    <Button onClick={() => setCreateOpen(true)} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Testimonial
                    </Button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search by name or content..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
                    {search && (
                        <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(t => (
                        <Card key={t.id}>
                            <CardContent className="p-5 space-y-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-200 shrink-0">
                                            {t.image_path ? (
                                                <img src={t.image_path.startsWith('http') ? t.image_path : `/${t.image_path}`} alt={t.name}
                                                    className="h-full w-full object-cover"
                                                    onError={e => { e.currentTarget.style.display = 'none'; }} />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-zinc-400 text-xl font-bold">{t.name[0]}</div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{t.name}</p>
                                            <p className="text-xs text-muted-foreground">{t.role}</p>
                                            {t.rating && (
                                                <div className="flex gap-0.5 mt-0.5">
                                                    {Array.from({ length: t.rating }).map((_, i) => (
                                                        <Star key={i} className="w-3 h-3 fill-orange-400 text-orange-400" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5 shrink-0">
                                        <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => setEditTestimonial(t)}>
                                            <Pencil className="w-3 h-3" />
                                        </Button>
                                        <Button size="sm" variant="destructive" className="h-7 w-7 p-0" onClick={() => handleDelete(t)}>
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="relative">
                                    <Quote className="w-6 h-6 text-orange-200 dark:text-orange-900 absolute -top-1 -left-1" />
                                    <p className="text-sm text-muted-foreground line-clamp-4 pl-4 italic">{t.content}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full text-center py-16 text-muted-foreground">
                            <Quote className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p>No testimonials found.</p>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader><DialogTitle>Add New Testimonial</DialogTitle></DialogHeader>
                    <TestimonialForm mode="create" onSuccess={() => setCreateOpen(false)} onCancel={() => setCreateOpen(false)} />
                </DialogContent>
            </Dialog>

            <Dialog open={!!editTestimonial} onOpenChange={open => !open && setEditTestimonial(null)}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader><DialogTitle>Edit Testimonial</DialogTitle></DialogHeader>
                    {editTestimonial && (
                        <TestimonialForm mode="edit" initial={editTestimonial} onSuccess={() => setEditTestimonial(null)} onCancel={() => setEditTestimonial(null)} />
                    )}
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
