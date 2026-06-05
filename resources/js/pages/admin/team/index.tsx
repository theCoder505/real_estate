import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2, UserCircle2, X, Upload } from 'lucide-react';
import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    image_path: string;
}

interface TeamIndexProps {
    team: TeamMember[];
}

function TeamMemberForm({
    initial,
    onSuccess,
    onCancel,
    mode,
}: {
    initial?: Partial<TeamMember>;
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
        bio: initial?.bio || '',
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

    const displaySrc = imagePreview ?? existingImageSrc;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = mode === 'edit' ? route('admin.team-members.update', initial!.id) : route('admin.team-members.store');
        post(url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Done!',
                    text: `Team member ${mode === 'edit' ? 'updated' : 'added'} successfully.`,
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
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Image Upload with Preview */}
                <div className="col-span-2 space-y-2">
                    <Label>Profile Photo</Label>
                    <div className="flex flex-col items-center gap-4">
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
                                        />
                                    ) : (
                                        <UserCircle2 className="h-16 w-16 text-zinc-300" />
                                    )}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                    <Upload className="h-6 w-6 text-white" />
                                </div>
                            </button>
                            
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

                <div className="space-y-1 sm:col-span-2">
                    <Label>Name</Label>
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Sarah Jenkins" />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                
                <div className="space-y-1 sm:col-span-2">
                    <Label>Role / Position</Label>
                    <Input value={data.role} onChange={(e) => setData('role', e.target.value)} placeholder="Founder & CEO" />
                    {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
                </div>

                <div className="space-y-1 sm:col-span-2">
                    <Label>Short Bio</Label>
                    <textarea
                        rows={4}
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                        className="border-input bg-background ring-offset-background focus-visible:ring-ring flex w-full resize-none rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-hidden"
                        placeholder="Introduce this team member..."
                    />
                    {errors.bio && <p className="text-xs text-red-500">{errors.bio}</p>}
                </div>
            </div>

            <DialogFooter>
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {mode === 'edit' ? 'Update Member' : 'Add Member'}
                </Button>
            </DialogFooter>
        </form>
    );
}

export default function TeamIndex({ team }: TeamIndexProps) {
    const [search, setSearch] = useState('');
    const [createOpen, setCreateOpen] = useState(false);
    const [editMember, setEditMember] = useState<TeamMember | null>(null);

    const filtered = team.filter(
        (m) =>
            m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.role.toLowerCase().includes(search.toLowerCase()) ||
            (m.bio && m.bio.toLowerCase().includes(search.toLowerCase())),
    );

    const handleDelete = (m: TeamMember) => {
        Swal.fire({
            title: 'Remove Team Member?',
            text: `"${m.name}" will be removed from the team.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, remove them!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.team-members.destroy', m.id), {
                    preserveScroll: true,
                    onSuccess: () =>
                        Swal.fire({
                            icon: 'success',
                            title: 'Removed!',
                            text: 'Team member has been removed.',
                            timer: 2000,
                            showConfirmButton: false,
                        }),
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Team Management" />

            <div className="space-y-6 px-4 py-4 lg:px-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Team Members</h2>
                        <p className="text-muted-foreground">{team.length} total members</p>
                    </div>
                    <Button onClick={() => setCreateOpen(true)} className="gap-2">
                        <Plus className="h-4 w-4" /> Add Team Member
                    </Button>
                </div>

                <div className="relative">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input placeholder="Search by name, role, or bio..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
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
                    {filtered.map((m) => (
                        <Card key={m.id}>
                            <CardContent className="space-y-4 p-5">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-zinc-200">
                                            {m.image_path ? (
                                                <img
                                                    src={m.image_path.startsWith('http') ? m.image_path : `/${m.image_path}`}
                                                    alt={m.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-xl font-bold text-zinc-400">
                                                    {m.name[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{m.name}</p>
                                            <p className="text-muted-foreground text-xs">{m.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 gap-1.5">
                                        <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => setEditMember(m)}>
                                            <Pencil className="h-3 w-3" />
                                        </Button>
                                        <Button size="sm" variant="destructive" className="h-7 w-7 p-0" onClick={() => handleDelete(m)}>
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed line-clamp-3">
                                    {m.bio || 'No bio provided.'}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-muted-foreground col-span-full py-16 text-center">
                            <UserCircle2 className="mx-auto mb-3 h-12 w-12 opacity-30" />
                            <p>No team members found.</p>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Team Member</DialogTitle>
                    </DialogHeader>
                    <TeamMemberForm mode="create" onSuccess={() => setCreateOpen(false)} onCancel={() => setCreateOpen(false)} />
                </DialogContent>
            </Dialog>

            <Dialog open={!!editMember} onOpenChange={(open) => !open && setEditMember(null)}>
                <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Team Member</DialogTitle>
                    </DialogHeader>
                    {editMember && (
                        <TeamMemberForm
                            mode="edit"
                            initial={editMember}
                            onSuccess={() => setEditMember(null)}
                            onCancel={() => setEditMember(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
