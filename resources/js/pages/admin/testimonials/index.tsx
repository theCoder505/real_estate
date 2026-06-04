import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Quote, Search, Star, Trash2, UserCircle2, X, Upload } from 'lucide-react';
import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';

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
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        _method: mode === 'edit' ? 'PUT' : 'POST',
        name: initial?.name || '',
        role: initial?.role || '',
        content: initial?.content || '',
        rating: initial?.rating?.toString() || '5',
        image: null as File | null,
    });

    const existingImageSrc = initial?.image_path ? (initial.image_path.startsWith('http') ? initial.image_path : `/${initial.image_path}`) : null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(file ? URL.createObjectURL(file) : null);
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    // The src to display: new preview > existing DB image > null
    const displaySrc = imagePreview ?? existingImageSrc;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = mode === 'edit' ? route('admin.testimonials.update', initial!.id) : route('admin.testimonials.store');
        post(url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Done!',
                    text: `Testimonial ${mode === 'edit' ? 'updated' : 'created'} successfully.`,
                    timer: 2500,
                    showConfirmButton: false,
                });
                onSuccess();
            },
            onError: () => Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please check the form for errors.' }),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                id="testimonial-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* ── Photo Upload with Clickable Preview ── */}
                <div className="col-span-2 space-y-2">
                    <Label>Profile Photo</Label>
                    <div className="flex flex-col items-center gap-4">
                        {/* Clickable avatar preview circle */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={handleImageClick}
                                className="group relative cursor-pointer focus:outline-none"
                            >
                                <div className="border-border flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 bg-zinc-100 transition-all group-hover:opacity-90">
                                    {displaySrc ? (
                                        <img
                                            src={displaySrc}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <UserCircle2 className="h-16 w-16 text-zinc-300" />
                                    )}
                                </div>
                                {/* Upload overlay on hover */}
                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                    <Upload className="h-6 w-6 text-white" />
                                </div>
                            </button>
                            
                            {/* Badge indicator */}
                            {displaySrc && (
                                <span
                                    className={`absolute -right-1 -bottom-1 rounded-full px-1.5 py-0.5 text-[9px] leading-none font-bold text-white ${imagePreview ? 'bg-orange-500' : 'bg-zinc-500'}`}
                                >
                                    {imagePreview ? 'NEW' : 'SET'}
                                </span>
                            )}
                        </div>

                        <div className="text-center">
                            <p className="text-muted-foreground text-xs">
                                {mode === 'edit' ? 'Click image to change photo' : 'Click to upload photo'}
                            </p>
                            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <Label>Client Name</Label>
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="John Doe" />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-1">
                    <Label>Role / Designation</Label>
                    <Input value={data.role} onChange={(e) => setData('role', e.target.value)} placeholder="Home Buyer" />
                    {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
                </div>

                <div className="col-span-2 space-y-1">
                    <Label>Rating (1–5)</Label>
                    <select
                        value={data.rating}
                        onChange={(e) => setData('rating', e.target.value)}
                        className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-hidden"
                    >
                        {[1, 2, 3, 4, 5].map((r) => (
                            <option key={r} value={r}>
                                {'★'.repeat(r)} ({r})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                    <Label>Testimonial Content</Label>
                    <textarea
                        rows={4}
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        className="border-input bg-background ring-offset-background focus-visible:ring-ring flex w-full resize-none rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-hidden"
                        placeholder="What did the client say..."
                    />
                    {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
                </div>
            </div>

            <DialogFooter>
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {mode === 'edit' ? 'Update Testimonial' : 'Add Testimonial'}
                </Button>
            </DialogFooter>
        </form>
    );
}

export default function TestimonialsIndex({ testimonials }: TestimonialsIndexProps) {
    const [search, setSearch] = useState('');
    const [createOpen, setCreateOpen] = useState(false);
    const [editTestimonial, setEditTestimonial] = useState<Testimonial | null>(null);

    const filtered = testimonials.filter(
        (t) =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.role.toLowerCase().includes(search.toLowerCase()) ||
            t.content.toLowerCase().includes(search.toLowerCase()),
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
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.testimonials.destroy', t.id), {
                    preserveScroll: true,
                    onSuccess: () =>
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'Testimonial removed.',
                            timer: 2000,
                            showConfirmButton: false,
                        }),
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Testimonials Management" />

            <div className="space-y-6 px-4 py-4 lg:px-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Testimonials</h2>
                        <p className="text-muted-foreground">{testimonials.length} total testimonials</p>
                    </div>
                    <Button onClick={() => setCreateOpen(true)} className="gap-2">
                        <Plus className="h-4 w-4" /> Add Testimonial
                    </Button>
                </div>

                <div className="relative">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input placeholder="Search by name or content..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((t) => (
                        <Card key={t.id}>
                            <CardContent className="space-y-4 p-5">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-zinc-200">
                                            {t.image_path ? (
                                                <img
                                                    src={t.image_path.startsWith('http') ? t.image_path : `/${t.image_path}`}
                                                    alt={t.name}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-xl font-bold text-zinc-400">
                                                    {t.name[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{t.name}</p>
                                            <p className="text-muted-foreground text-xs">{t.role}</p>
                                            {t.rating && (
                                                <div className="mt-0.5 flex gap-0.5">
                                                    {Array.from({ length: t.rating }).map((_, i) => (
                                                        <Star key={i} className="h-3 w-3 fill-orange-400 text-orange-400" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 gap-1.5">
                                        <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => setEditTestimonial(t)}>
                                            <Pencil className="h-3 w-3" />
                                        </Button>
                                        <Button size="sm" variant="destructive" className="h-7 w-7 p-0" onClick={() => handleDelete(t)}>
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="relative">
                                    <Quote className="absolute -top-1 -left-1 h-6 w-6 text-orange-200 dark:text-orange-900" />
                                    <p className="text-muted-foreground line-clamp-4 pl-4 text-sm italic">{t.content}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-muted-foreground col-span-full py-16 text-center">
                            <Quote className="mx-auto mb-3 h-12 w-12 opacity-30" />
                            <p>No testimonials found.</p>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Testimonial</DialogTitle>
                    </DialogHeader>
                    <TestimonialForm mode="create" onSuccess={() => setCreateOpen(false)} onCancel={() => setCreateOpen(false)} />
                </DialogContent>
            </Dialog>

            <Dialog open={!!editTestimonial} onOpenChange={(open) => !open && setEditTestimonial(null)}>
                <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Testimonial</DialogTitle>
                    </DialogHeader>
                    {editTestimonial && (
                        <TestimonialForm
                            mode="edit"
                            initial={editTestimonial}
                            onSuccess={() => setEditTestimonial(null)}
                            onCancel={() => setEditTestimonial(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}