import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { BookOpen, Image as ImageIcon, Pencil, Plus, Search, Trash2, Upload, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';

interface BlogPost {
    id: number;
    title: string;
    category: string;
    author: string;
    excerpt: string;
    content: string;
    published_at: string;
    image_path: string;
}

interface BlogIndexProps {
    posts: BlogPost[];
}

function BlogForm({
    initial,
    onSuccess,
    onCancel,
    mode,
}: {
    initial?: Partial<BlogPost>;
    onSuccess: () => void;
    onCancel: () => void;
    mode: 'create' | 'edit';
}) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        _method: mode === 'edit' ? 'PUT' : 'POST',
        title: initial?.title || '',
        category: initial?.category || '',
        author: initial?.author || '',
        excerpt: initial?.excerpt || '',
        content: initial?.content || '',
        published_at: initial?.published_at
            ? initial.published_at.substring(0, 10)
            : new Date().toISOString().substring(0, 10),
        image: null as File | null,
    });

    const existingImageSrc = initial?.image_path
        ? initial.image_path.startsWith('http')
            ? initial.image_path
            : initial.image_path
        : null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(file ? URL.createObjectURL(file) : null);
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        setData('image', null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const displaySrc = imagePreview ?? existingImageSrc;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url =
            mode === 'edit'
                ? route('admin.blog.update', initial!.id)
                : route('admin.blog.store');

        post(url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                if (imagePreview) URL.revokeObjectURL(imagePreview);
                setImagePreview(null);
                // No router.visit needed — controller redirects to index,
                // Inertia automatically refreshes props on redirect.
                Swal.fire({
                    icon: 'success',
                    title: 'Done!',
                    text: `Post ${mode === 'edit' ? 'updated' : 'created'} successfully.`,
                    timer: 2500,
                    showConfirmButton: false,
                });
                onSuccess();
            },
            onError: () =>
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please check the form for errors.',
                }),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1 sm:col-span-2">
                    <Label>Title</Label>
                    <Input
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="Post title"
                    />
                    {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                </div>
                <div className="space-y-1">
                    <Label>Category</Label>
                    <Input
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        placeholder="e.g. Market News"
                    />
                    {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                </div>
                <div className="space-y-1">
                    <Label>Author</Label>
                    <Input
                        value={data.author}
                        onChange={(e) => setData('author', e.target.value)}
                        placeholder="John Doe"
                    />
                    {errors.author && <p className="text-xs text-red-500">{errors.author}</p>}
                </div>
                <div className="space-y-1">
                    <Label>Published Date</Label>
                    <Input
                        type="date"
                        value={data.published_at}
                        onChange={(e) => setData('published_at', e.target.value)}
                    />
                    {errors.published_at && (
                        <p className="text-xs text-red-500">{errors.published_at}</p>
                    )}
                </div>

                {/* Image Upload with Preview */}
                <div className="space-y-1 sm:col-span-2">
                    <Label>Featured Image</Label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <div className="flex flex-col items-center gap-3">
                        <button
                            type="button"
                            onClick={handleImageClick}
                            className="group relative w-full cursor-pointer focus:outline-none"
                        >
                            <div className="overflow-hidden rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 transition-all hover:border-orange-400 group-hover:bg-zinc-100">
                                {displaySrc ? (
                                    <div className="relative aspect-[16/9]">
                                        <img
                                            src={displaySrc}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                            <Upload className="h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 p-8">
                                        <ImageIcon className="h-12 w-12 text-zinc-400" />
                                        <span className="text-sm text-zinc-500">
                                            Click to upload image
                                        </span>
                                        <span className="text-xs text-zinc-400">
                                            PNG, JPG, GIF up to 5MB
                                        </span>
                                    </div>
                                )}
                            </div>
                        </button>

                        {displaySrc && (
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="flex items-center gap-1 text-xs text-red-500 transition-colors hover:text-red-700"
                                >
                                    <X className="h-3 w-3" /> Remove Image
                                </button>
                            </div>
                        )}

                        {imagePreview && (
                            <p className="text-xs text-orange-500">
                                New image selected - will replace existing when saved
                            </p>
                        )}

                        {errors.image && (
                            <p className="text-xs text-red-500">{errors.image}</p>
                        )}

                        {mode === 'edit' && !imagePreview && existingImageSrc && (
                            <p className="text-muted-foreground text-xs">
                                Click image to change featured image
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                    <Label>Excerpt</Label>
                    <textarea
                        rows={2}
                        value={data.excerpt}
                        onChange={(e) => setData('excerpt', e.target.value)}
                        className="border-input bg-background ring-offset-background focus-visible:ring-ring flex w-full resize-none rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-hidden"
                        placeholder="Short summary..."
                    />
                    {errors.excerpt && <p className="text-xs text-red-500">{errors.excerpt}</p>}
                </div>
                <div className="space-y-1 sm:col-span-2">
                    <Label>Content</Label>
                    <textarea
                        rows={6}
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        className="border-input bg-background ring-offset-background focus-visible:ring-ring flex w-full resize-none rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-hidden"
                        placeholder="Full post content..."
                    />
                    {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {mode === 'edit' ? 'Update Post' : 'Create Post'}
                </Button>
            </DialogFooter>
        </form>
    );
}

export default function BlogIndex({ posts }: BlogIndexProps) {
    const [search, setSearch] = useState('');
    const [createOpen, setCreateOpen] = useState(false);
    const [editPost, setEditPost] = useState<BlogPost | null>(null);

    const filtered = posts.filter(
        (p) =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase()) ||
            p.author.toLowerCase().includes(search.toLowerCase()),
    );

    const handleDelete = (post: BlogPost) => {
        Swal.fire({
            title: 'Delete Post?',
            text: `"${post.title}" will be permanently deleted.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.blog.destroy', post.id), {
                    preserveScroll: true,
                    // No router.visit needed — controller redirects to index,
                    // Inertia automatically refreshes props on redirect.
                    onSuccess: () => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'Post removed.',
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Blog Management" />

            <div className="space-y-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Blog Posts</h2>
                        <p className="text-muted-foreground">{posts.length} total posts</p>
                    </div>
                    <Button onClick={() => setCreateOpen(true)} className="gap-2">
                        <Plus className="h-4 w-4" /> Add Post
                    </Button>
                </div>

                <div className="relative">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                        placeholder="Search by title, category or author..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
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
                    {filtered.map((post) => (
                        <Card key={post.id} className="group overflow-hidden">
                            <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100">
                                {post.image_path ? (
                                    <img
                                        src={
                                            post.image_path.startsWith('http')
                                                ? post.image_path
                                                : post.image_path
                                        }
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                'https://placehold.co/640x360?text=No+Image';
                                        }}
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-zinc-100">
                                        <ImageIcon className="h-12 w-12 text-zinc-300" />
                                    </div>
                                )}
                                <span className="absolute top-2 left-2 rounded-lg bg-orange-600 px-2 py-1 text-xs font-bold text-white">
                                    {post.category}
                                </span>
                            </div>
                            <CardContent className="space-y-2 p-4">
                                <h3 className="line-clamp-2 text-sm leading-snug font-bold">
                                    {post.title}
                                </h3>
                                <div className="text-muted-foreground flex items-center justify-between text-xs">
                                    <span>By {post.author}</span>
                                    <span>
                                        {post.published_at
                                            ? new Date(post.published_at).toLocaleDateString(
                                                  'en-US',
                                                  {
                                                      month: 'short',
                                                      day: 'numeric',
                                                      year: 'numeric',
                                                  },
                                              )
                                            : '—'}
                                    </span>
                                </div>
                                <p className="text-muted-foreground line-clamp-2 text-xs">
                                    {post.excerpt}
                                </p>
                                <div className="flex justify-end gap-2 pt-1">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                        onClick={() => setEditPost(post)}
                                    >
                                        <Pencil className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        className="h-8 w-8 p-0"
                                        onClick={() => handleDelete(post)}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-muted-foreground col-span-full py-16 text-center">
                            <BookOpen className="mx-auto mb-3 h-12 w-12 opacity-30" />
                            <p>No blog posts found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Dialog */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Post</DialogTitle>
                    </DialogHeader>
                    <BlogForm
                        mode="create"
                        onSuccess={() => setCreateOpen(false)}
                        onCancel={() => setCreateOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editPost} onOpenChange={(open) => !open && setEditPost(null)}>
                <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Post</DialogTitle>
                    </DialogHeader>
                    {editPost && (
                        <BlogForm
                            mode="edit"
                            initial={editPost}
                            onSuccess={() => setEditPost(null)}
                            onCancel={() => setEditPost(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}