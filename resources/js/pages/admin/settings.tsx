import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/layouts/authenticated-layout';

interface SettingsProps {
    settings: {
        id: number;
        company_name: string;
        contact_email: string;
        contact_phone: string;
        contact_address: string;
        facebook_url: string;
        twitter_url: string;
        instagram_url: string;
        linkedin_url: string;
        google_map_iframe: string;
        logo_path: string;
        icon_path: string;
    };
}

export default function Settings({ settings }: SettingsProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        company_name: settings?.company_name || '',
        contact_email: settings?.contact_email || '',
        contact_phone: settings?.contact_phone || '',
        contact_address: settings?.contact_address || '',
        facebook_url: settings?.facebook_url || '',
        twitter_url: settings?.twitter_url || '',
        instagram_url: settings?.instagram_url || '',
        linkedin_url: settings?.linkedin_url || '',
        google_map_iframe: settings?.google_map_iframe || '',
        logo: null as File | null,
        icon: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Saved!',
                    text: 'Settings have been successfully updated.',
                    timer: 3000,
                    showConfirmButton: false
                });
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please check the form.',
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Site Settings" />

            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">Manage your website's global settings, contact details, and social links.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Information</CardTitle>
                            <CardDescription>Update your company name and branding.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company_name">Company Name</Label>
                                    <Input
                                        id="company_name"
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        placeholder="e.g., Venture Builders"
                                    />
                                    {errors.company_name && <p className="text-xs text-red-500">{errors.company_name}</p>}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="logo">Company Logo (PNG/JPG)</Label>
                                    <Input
                                        id="logo"
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={(e) => setData('logo', e.target.files?.[0] || null)}
                                    />
                                    {errors.logo && <p className="text-xs text-red-500">{errors.logo}</p>}
                                    {settings?.logo_path && !data.logo && (
                                        <div className="mt-2 p-2 bg-zinc-100 rounded-lg inline-block">
                                            <img src={`/${settings.logo_path}`} alt="Current Logo" className="h-12 object-contain" />
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="icon">Favicon / App Icon (PNG)</Label>
                                    <Input
                                        id="icon"
                                        type="file"
                                        accept="image/png"
                                        onChange={(e) => setData('icon', e.target.files?.[0] || null)}
                                    />
                                    {errors.icon && <p className="text-xs text-red-500">{errors.icon}</p>}
                                    {settings?.icon_path && !data.icon && (
                                        <div className="mt-2 p-2 bg-zinc-100 rounded-lg inline-block">
                                            <img src={`/${settings.icon_path}`} alt="Current Icon" className="h-12 object-contain" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>How customers can reach you.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contact_email">Email Address</Label>
                                    <Input
                                        id="contact_email"
                                        type="email"
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                        placeholder="info@example.com"
                                    />
                                    {errors.contact_email && <p className="text-xs text-red-500">{errors.contact_email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contact_phone">Phone Number</Label>
                                    <Input
                                        id="contact_phone"
                                        value={data.contact_phone}
                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                        placeholder="+1 234 567 890"
                                    />
                                    {errors.contact_phone && <p className="text-xs text-red-500">{errors.contact_phone}</p>}
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="contact_address">Address</Label>
                                    <Input
                                        id="contact_address"
                                        value={data.contact_address}
                                        onChange={(e) => setData('contact_address', e.target.value)}
                                        placeholder="123 Venture St, NY"
                                    />
                                    {errors.contact_address && <p className="text-xs text-red-500">{errors.contact_address}</p>}
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="google_map_iframe">Google Maps Iframe</Label>
                                    <Input
                                        id="google_map_iframe"
                                        value={data.google_map_iframe}
                                        onChange={(e) => setData('google_map_iframe', e.target.value)}
                                        placeholder='<iframe src="..."></iframe>'
                                    />
                                    {errors.google_map_iframe && <p className="text-xs text-red-500">{errors.google_map_iframe}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Social Media Links</CardTitle>
                            <CardDescription>Links to your social profiles.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="facebook_url">Facebook URL</Label>
                                    <Input
                                        id="facebook_url"
                                        type="url"
                                        value={data.facebook_url}
                                        onChange={(e) => setData('facebook_url', e.target.value)}
                                        placeholder="https://facebook.com/..."
                                    />
                                    {errors.facebook_url && <p className="text-xs text-red-500">{errors.facebook_url}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="twitter_url">Twitter URL</Label>
                                    <Input
                                        id="twitter_url"
                                        type="url"
                                        value={data.twitter_url}
                                        onChange={(e) => setData('twitter_url', e.target.value)}
                                        placeholder="https://twitter.com/..."
                                    />
                                    {errors.twitter_url && <p className="text-xs text-red-500">{errors.twitter_url}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="instagram_url">Instagram URL</Label>
                                    <Input
                                        id="instagram_url"
                                        type="url"
                                        value={data.instagram_url}
                                        onChange={(e) => setData('instagram_url', e.target.value)}
                                        placeholder="https://instagram.com/..."
                                    />
                                    {errors.instagram_url && <p className="text-xs text-red-500">{errors.instagram_url}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                                    <Input
                                        id="linkedin_url"
                                        type="url"
                                        value={data.linkedin_url}
                                        onChange={(e) => setData('linkedin_url', e.target.value)}
                                        placeholder="https://linkedin.com/..."
                                    />
                                    {errors.linkedin_url && <p className="text-xs text-red-500">{errors.linkedin_url}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing} className="gap-2">
                            <Save className="w-4 h-4" />
                            Save Settings
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
