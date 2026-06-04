import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, BookOpen, Search, X } from 'lucide-react';
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
    const { data, setData, post, processing, errors } = useForm({
        _method: mode === 'edit' ? 'PUT' : 'POST',
        title: initial?.title || '',
        category: initial?.category || '',
        author: initial?.author || '',
        excerpt: initial?.excerpt || '',
        content: initial?.content || '',
        published_at: initial?.published_at ? initial.published_at.substring(0, 10) : new Date().toISOString().substring(0, 10),
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = mode === 'edit'
            ? route('admin.blog.update', initial!.id)
            : route('admin.blog.store');
        post(url, {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({ icon: 'success', title: 'Done!', text: `Post ${mode === 'edit' ? 'updated' : 'created'} successfully.`, timer: 2500, showConfirmButton: false });
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
                    <Input value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Post title" />
                    {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                </div>
                <div className="space-y-1">
                    <Label>Category</Label>
                    <Input value={data.category} onChange={e => setData('category', e.target.value)} placeholder="e.g. Market News" />
                    {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                </div>
                <div className="space-y-1">
                    <Label>Author</Label>
                    <Input value={data.author} onChange={e => setData('author', e.target.value)} placeholder="John Doe" />
                    {errors.author && <p className="text-xs text-red-500">{errors.author}</p>}
                </div>
                <div className="space-y-1">
                    <Label>Published Date</Label>
                    <Input type="date" value={data.published_at} onChange={e => setData('published_at', e.target.value)} />
                </div>
                <div className="space-y-1 sm:col-span-2">
                    <Label>Image</Label>
                    {initial?.image_path && (
                        <div className="mb-2 rounded-lg overflow-hidden h-32 w-full bg-zinc-100">
                            <img src={initial.image_path.startsWith('http') ? initial.image_path : `/${initial.image_path}`} alt="Current" className="h-full w-full object-cover" />
                        </div>
                    )}
                    <Input type="file" accept="image/*" onChange={e => setData('image', e.target.files?.[0] || null)} />
                    {mode === 'edit' && <p className="text-xs text-muted-foreground">Leave empty to keep existing image</p>}
                </div>
                <div className="space-y-1 sm:col-span-2">
                    <Label>Excerpt</Label>
                    <textarea rows={2} value={data.excerpt} onChange={e => setData('excerpt', e.target.value)}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring resize-none"
                        placeholder="Short summary..." />
                    {errors.excerpt && <p className="text-xs text-red-500">{errors.excerpt}</p>}
                </div>
                <div className="space-y-1 sm:col-span-2">
                    <Label>Content</Label>
                    <textarea rows={6} value={data.content} onChange={e => setData('content', e.target.value)}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring resize-none"
                        placeholder="Full post content..." />
                    {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={processing}>{mode === 'edit' ? 'Update Post' : 'Create Post'}</Button>
            </DialogFooter>
        </form>
    );
}

export default function BlogIndex({ posts }: BlogIndexProps) {
    const [search, setSearch] = useState('');
    const [createOpen, setCreateOpen] = useState(false);
    const [editPost, setEditPost] = useState<BlogPost | null>(null);

    const filtered = posts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.author.toLowerCase().includes(search.toLowerCase())
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
        }).then(result => {
            if (result.isConfirmed) {
                router.delete(route('admin.blog.destroy', post.id), {
                    preserveScroll: true,
                    onSuccess: () => Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Post removed.', timer: 2000, showConfirmButton: false }),
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Blog Management" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Blog Posts</h2>
                        <p className="text-muted-foreground">{posts.length} total posts</p>
                    </div>
                    <Button onClick={() => setCreateOpen(true)} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Post
                    </Button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search by title, category or author..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
                    {search && (
                        <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(post => (
                        <Card key={post.id} className="overflow-hidden group">
                            <div className="relative aspect-[16/9] bg-zinc-100 overflow-hidden">
                                <img
                                    src={post.image_path?.startsWith('http') ? post.image_path : `/${post.image_path}`}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={e => { e.currentTarget.src = 'https://placehold.co/640x360?text=No+Image'; }}
                                />
                                <span className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-lg bg-orange-600 text-white">
                                    {post.category}
                                </span>
                            </div>
                            <CardContent className="p-4 space-y-2">
                                <h3 className="font-bold text-sm line-clamp-2 leading-snug">{post.title}</h3>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>By {post.author}</span>
                                    <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                                <div className="flex justify-end gap-2 pt-1">
                                    <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => setEditPost(post)}>
                                        <Pencil className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => handleDelete(post)}>
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full text-center py-16 text-muted-foreground">
                            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p>No blog posts found.</p>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader><DialogTitle>Add New Post</DialogTitle></DialogHeader>
                    <BlogForm mode="create" onSuccess={() => setCreateOpen(false)} onCancel={() => setCreateOpen(false)} />
                </DialogContent>
            </Dialog>

            <Dialog open={!!editPost} onOpenChange={open => !open && setEditPost(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader><DialogTitle>Edit Post</DialogTitle></DialogHeader>
                    {editPost && <BlogForm mode="edit" initial={editPost} onSuccess={() => setEditPost(null)} onCancel={() => setEditPost(null)} />}
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
