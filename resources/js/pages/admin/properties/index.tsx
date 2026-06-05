import React, { useState } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Home, Bath, BedDouble, Maximize2, Search, X, ImageIcon } from 'lucide-react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/layouts/authenticated-layout';

interface Property {
    id: number;
    title: string;
    type: string;
    price: number;
    location: string;
    description: string;
    beds: number;
    baths: number;
    sqft: number;
    status: string;
    featured: boolean;
    features: string[];
    image_path: string;
    images?: string[];
}

interface PropertiesIndexProps {
    properties: Property[];
}

const STATUSES = ['For Sale', 'For Rent', 'Sold', 'Rented'];
const TYPES = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Duplex', 'Penthouse'];

function PropertyForm({
    initial,
    onSuccess,
    onCancel,
    mode,
}: {
    initial?: Partial<Property>;
    onSuccess: () => void;
    onCancel: () => void;
    mode: 'create' | 'edit';
}) {
    const { settings } = usePage<any>().props;
    const currencySym = settings?.currency_symbol || '$';

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>(
        initial?.images && Array.isArray(initial.images) ? initial.images : []
    );

    const { data, setData, post, processing, errors, transform } = useForm({
        _method: mode === 'edit' ? 'PUT' : 'POST',
        title: initial?.title || '',
        type: initial?.type || TYPES[0],
        price: initial?.price?.toString() || '',
        location: initial?.location || '',
        description: initial?.description || '',
        beds: initial?.beds?.toString() || '1',
        baths: initial?.baths?.toString() || '1',
        sqft: initial?.sqft?.toString() || '',
        status: initial?.status || STATUSES[0],
        featured: initial?.featured ? '1' : '0',
        features: initial?.features?.join(', ') || '',
        image: null as File | null,
        gallery_images: [] as File[],
        remove_images: [] as string[],
    });

    transform((data) => ({
        ...data,
        features: data.features
            ? data.features.split(',').map((f: string) => f.trim()).filter(Boolean)
            : [],
    }));

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);

        if (imagePreview) URL.revokeObjectURL(imagePreview);

        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    const handleRemoveNewImage = () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        setData('image', null);
        const fileInput = document.getElementById('property-image-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setData('gallery_images', [...(data.gallery_images || []), ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setGalleryPreviews(prev => [...prev, ...newPreviews]);
    };

    const handleRemoveNewGalleryImage = (idx: number) => {
        const updatedFiles = data.gallery_images.filter((_, i) => i !== idx);
        setData('gallery_images', updatedFiles);

        URL.revokeObjectURL(galleryPreviews[idx]);
        setGalleryPreviews(prev => prev.filter((_, i) => i !== idx));
    };

    const handleRemoveExistingImage = (path: string) => {
        setExistingImages(prev => prev.filter(img => img !== path));
        setData('remove_images', [...(data.remove_images || []), path]);
    };

    const existingImageSrc = initial?.image_path
        ? (initial.image_path.startsWith('http') ? initial.image_path : `${initial.image_path}`)
        : null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = mode === 'edit'
            ? route('admin.properties.update', initial!.id)
            : route('admin.properties.store');

        post(url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                // Revoke object URLs to avoid memory leaks
                if (imagePreview) URL.revokeObjectURL(imagePreview);
                galleryPreviews.forEach(preview => URL.revokeObjectURL(preview));

                Swal.fire({
                    icon: 'success',
                    title: 'Done!',
                    text: `Property ${mode === 'edit' ? 'updated' : 'created'} successfully.`,
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                    <Label>Title</Label>
                    <Input value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Property title" />
                    {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                </div>
                <div className="space-y-1">
                    <Label>Type</Label>
                    <select value={data.type} onChange={e => setData('type', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
                        {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div className="space-y-1">
                    <Label>Status</Label>
                    <select value={data.status} onChange={e => setData('status', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="space-y-1">
                    <Label>Price ({currencySym})</Label>
                    <Input type="number" value={data.price} onChange={e => setData('price', e.target.value)} placeholder="450000" />
                    {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
                </div>
                <div className="space-y-1">
                    <Label>Location</Label>
                    <Input value={data.location} onChange={e => setData('location', e.target.value)} placeholder="Downtown, NY" />
                    {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
                </div>
                <div className="space-y-1">
                    <Label>Beds</Label>
                    <Input type="number" value={data.beds} onChange={e => setData('beds', e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label>Baths</Label>
                    <Input type="number" step="0.5" value={data.baths} onChange={e => setData('baths', e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label>Area (sqft)</Label>
                    <Input type="number" value={data.sqft} onChange={e => setData('sqft', e.target.value)} placeholder="1200" />
                </div>
                <div className="space-y-1">
                    <Label>Featured</Label>
                    <select value={data.featured} onChange={e => setData('featured', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <div className="space-y-1 sm:col-span-2">
                    <Label>Features (comma-separated)</Label>
                    <Input value={data.features} onChange={e => setData('features', e.target.value)} placeholder="Pool, Gym, Parking" />
                    {errors.features && <p className="text-xs text-red-500">{errors.features}</p>}
                </div>
                <div className="space-y-1 sm:col-span-2">
                    <Label>Description</Label>
                    <textarea
                        rows={3}
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring resize-none"
                        placeholder="Property description..."
                    />
                    {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                </div>

                {/* ── Main Cover Image ── */}
                <div className="space-y-2 sm:col-span-2">
                    <Label>Cover Image</Label>
                    {(imagePreview || existingImageSrc) ? (
                        <div className="relative rounded-lg overflow-hidden bg-zinc-100 border border-border">
                            <img
                                src={imagePreview ?? existingImageSrc!}
                                alt="Preview"
                                className="w-full h-48 object-cover"
                                onError={e => { e.currentTarget.src = 'https://placehold.co/640x200?text=Invalid+Image'; }}
                            />
                            <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full text-white ${imagePreview ? 'bg-orange-500' : 'bg-zinc-600'}`}>
                                {imagePreview ? 'New image' : 'Current image'}
                            </span>
                            {imagePreview && (
                                <button
                                    type="button"
                                    onClick={handleRemoveNewImage}
                                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
                                    title="Remove selected image"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-48 rounded-lg border-2 border-dashed border-border bg-muted/30 text-muted-foreground gap-2">
                            <ImageIcon className="w-10 h-10 opacity-30" />
                            <p className="text-sm">No image selected</p>
                        </div>
                    )}

                    <Input
                        id="property-image-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {errors.image && <p className="text-xs text-red-500">{errors.image}</p>}
                </div>

                {/* ── Gallery Images ── */}
                <div className="space-y-2 sm:col-span-2 border-t pt-4 mt-2">
                    <Label className="font-bold text-sm">Property Photo Gallery</Label>

                    {/* Existing Gallery Images */}
                    {existingImages.length > 0 && (
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-semibold">Existing Gallery:</span>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {existingImages.map((path, idx) => {
                                    const src = path.startsWith('http') ? path : `${path}`;
                                    return (
                                        <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border bg-zinc-50">
                                            <img src={src} alt="Gallery item" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveExistingImage(path)}
                                                className="absolute top-1 right-1 bg-red-650 hover:bg-red-750 text-white rounded-full p-1 transition-colors"
                                                title="Delete this image"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* New Gallery Previews */}
                    {galleryPreviews.length > 0 && (
                        <div className="space-y-1">
                            <span className="text-xs text-orange-500 font-semibold">New Selected Gallery Images:</span>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {galleryPreviews.map((preview, idx) => (
                                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border bg-zinc-50">
                                        <img src={preview} alt="New gallery preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveNewGalleryImage(idx)}
                                            className="absolute top-1 right-1 bg-red-650 hover:bg-red-750 text-white rounded-full p-1 transition-colors"
                                            title="Remove this preview"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Multiple Files Selector */}
                    <div className="flex flex-col gap-2 mt-2">
                        <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleGalleryChange}
                            className="cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground">Select one or more images to add to the property photo gallery.</p>
                    </div>
                </div>
            </div>

            <DialogFooter>
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={processing}>
                    {mode === 'edit' ? 'Update Property' : 'Create Property'}
                </Button>
            </DialogFooter>
        </form>
    );
}

export default function PropertiesIndex({ properties }: PropertiesIndexProps) {
    const { settings } = usePage<any>().props;
    const currencySym = settings?.currency_symbol || '$';

    const [search, setSearch] = useState('');
    const [createOpen, setCreateOpen] = useState(false);
    const [editProperty, setEditProperty] = useState<Property | null>(null);

    const filtered = properties.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase()) ||
        p.type.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (property: Property) => {
        Swal.fire({
            title: 'Delete Property?',
            text: `"${property.title}" will be permanently deleted.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
        }).then(result => {
            if (result.isConfirmed) {
                router.delete(route('admin.properties.destroy', property.id), {
                    preserveScroll: true,
                    onSuccess: () => Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Property removed.', timer: 2000, showConfirmButton: false }),
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Properties Management" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Properties</h2>
                        <p className="text-muted-foreground">{properties.length} total properties</p>
                    </div>
                    <Button onClick={() => setCreateOpen(true)} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Property
                    </Button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by title, location or type..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-9"
                    />
                    {search && (
                        <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(property => (
                        <Card key={property.id} className="overflow-hidden group">
                            <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
                                <img
                                    src={property.image_path?.startsWith('http') ? property.image_path : `${property.image_path}`}
                                    alt={property.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={e => { e.currentTarget.src = 'https://placehold.co/640x400?text=No+Image'; }}
                                />
                                <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-lg text-white ${property.featured ? 'bg-orange-600' : 'bg-zinc-700'}`}>
                                    {property.featured ? 'Featured' : property.type}
                                </span>
                                <span className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-lg bg-white/90 text-zinc-800">
                                    {property.status}
                                </span>
                            </div>
                            <CardContent className="p-4 space-y-3">
                                <div>
                                    <h3 className="font-bold text-sm line-clamp-1">{property.title}</h3>
                                    <p className="text-xs text-muted-foreground">{property.location}</p>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" />{property.beds}</span>
                                    <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{property.baths}</span>
                                    <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5" />{property.sqft} sqft</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-extrabold text-orange-600">{currencySym}{Number(property.price).toLocaleString('en-us')}</span>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => setEditProperty(property)}>
                                            <Pencil className="w-3.5 h-3.5" />
                                        </Button>
                                        <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => handleDelete(property)}>
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full text-center py-16 text-muted-foreground">
                            <Home className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p>No properties found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Dialog */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Property</DialogTitle>
                    </DialogHeader>
                    <PropertyForm mode="create" onSuccess={() => setCreateOpen(false)} onCancel={() => setCreateOpen(false)} />
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editProperty} onOpenChange={open => !open && setEditProperty(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Property</DialogTitle>
                    </DialogHeader>
                    {editProperty && (
                        <PropertyForm mode="edit" initial={editProperty} onSuccess={() => setEditProperty(null)} onCancel={() => setEditProperty(null)} />
                    )}
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}