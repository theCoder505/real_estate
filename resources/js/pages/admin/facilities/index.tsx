import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Building2, Search, X } from 'lucide-react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/layouts/authenticated-layout';

interface Facility {
    id: number;
    title: string;
    icon: string;
    description: string;
}

interface FacilitiesIndexProps {
    facilities: Facility[];
}

const ICON_OPTIONS = [
    'Shield', 'Building2', 'Leaf', 'Zap', 'Waves', 'Car', 'Wifi', 'Lock',
    'Dumbbell', 'Trees', 'Sun', 'Star', 'Home', 'MapPin', 'Phone', 'Clock',
];

function FacilityForm({
    initial,
    onSuccess,
    onCancel,
    mode,
}: {
    initial?: Partial<Facility>;
    onSuccess: () => void;
    onCancel: () => void;
    mode: 'create' | 'edit';
}) {
    const { data, setData, post, processing, errors } = useForm({
        _method: mode === 'edit' ? 'PUT' : 'POST',
        title: initial?.title || '',
        icon: initial?.icon || 'Building2',
        description: initial?.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = mode === 'edit'
            ? route('admin.facilities.update', initial!.id)
            : route('admin.facilities.store');
        post(url, {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({ icon: 'success', title: 'Done!', text: `Facility ${mode === 'edit' ? 'updated' : 'created'} successfully.`, timer: 2500, showConfirmButton: false });
                onSuccess();
            },
            onError: () => Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please check the form for errors.' }),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
                <Label>Title</Label>
                <Input value={data.title} onChange={e => setData('title', e.target.value)} placeholder="e.g. Security" />
                {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
            </div>
            <div className="space-y-1">
                <Label>Icon (Lucide name)</Label>
                <select value={data.icon} onChange={e => setData('icon', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
                    {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                </select>
                <p className="text-xs text-muted-foreground">Current value: <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">{data.icon}</code></p>
                {errors.icon && <p className="text-xs text-red-500">{errors.icon}</p>}
            </div>
            <div className="space-y-1">
                <Label>Description</Label>
                <textarea rows={3} value={data.description} onChange={e => setData('description', e.target.value)}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    placeholder="Brief description of this facility..." />
                {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={processing}>{mode === 'edit' ? 'Update Facility' : 'Create Facility'}</Button>
            </DialogFooter>
        </form>
    );
}

export default function FacilitiesIndex({ facilities }: FacilitiesIndexProps) {
    const [search, setSearch] = useState('');
    const [createOpen, setCreateOpen] = useState(false);
    const [editFacility, setEditFacility] = useState<Facility | null>(null);

    const filtered = facilities.filter(f =>
        f.title.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (facility: Facility) => {
        Swal.fire({
            title: 'Delete Facility?',
            text: `"${facility.title}" will be permanently deleted.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
        }).then(result => {
            if (result.isConfirmed) {
                router.delete(route('admin.facilities.destroy', facility.id), {
                    preserveScroll: true,
                    onSuccess: () => Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Facility removed.', timer: 2000, showConfirmButton: false }),
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Facilities Management" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Facilities</h2>
                        <p className="text-muted-foreground">{facilities.length} total facilities</p>
                    </div>
                    <Button onClick={() => setCreateOpen(true)} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Facility
                    </Button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search facilities..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
                    {search && (
                        <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(facility => (
                        <Card key={facility.id}>
                            <CardContent className="p-5 flex items-start gap-4">
                                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-xl shrink-0">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="font-bold text-sm">{facility.title}</h3>
                                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{facility.description}</p>
                                            <span className="inline-block mt-1 text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-mono">{facility.icon}</span>
                                        </div>
                                        <div className="flex gap-1.5 shrink-0">
                                            <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => setEditFacility(facility)}>
                                                <Pencil className="w-3 h-3" />
                                            </Button>
                                            <Button size="sm" variant="destructive" className="h-7 w-7 p-0" onClick={() => handleDelete(facility)}>
                                                <Trash2 className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full text-center py-16 text-muted-foreground">
                            <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p>No facilities found.</p>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Add New Facility</DialogTitle></DialogHeader>
                    <FacilityForm mode="create" onSuccess={() => setCreateOpen(false)} onCancel={() => setCreateOpen(false)} />
                </DialogContent>
            </Dialog>

            <Dialog open={!!editFacility} onOpenChange={open => !open && setEditFacility(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Edit Facility</DialogTitle></DialogHeader>
                    {editFacility && <FacilityForm mode="edit" initial={editFacility} onSuccess={() => setEditFacility(null)} onCancel={() => setEditFacility(null)} />}
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
