import React, { useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save, Upload, X, Image as ImageIcon } from 'lucide-react';
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
        // New fields
        broker_name: string;
        broker_image_path: string;
        our_journey: string;
        years_of_experience: number | string;
        building_finished: number | string;
        satisfied_clients: number | string;
        expert_agents: number | string;
        our_mission: string;
        our_vision: string;
        currency_code: string;
        currency_symbol: string;
    };
}

export default function Settings({ settings }: SettingsProps) {
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [iconPreview, setIconPreview] = useState<string | null>(null);
    const [brokerPreview, setBrokerPreview] = useState<string | null>(null);

    const logoInputRef = useRef<HTMLInputElement>(null);
    const iconInputRef = useRef<HTMLInputElement>(null);
    const brokerInputRef = useRef<HTMLInputElement>(null);

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
        
        // New fields
        broker_name: settings?.broker_name || '',
        broker_image: null as File | null,
        remove_broker_image: '0',
        our_journey: settings?.our_journey || '',
        years_of_experience: settings?.years_of_experience || '',
        building_finished: settings?.building_finished || '',
        satisfied_clients: settings?.satisfied_clients || '',
        expert_agents: settings?.expert_agents || '',
        our_mission: settings?.our_mission || '',
        our_vision: settings?.our_vision || '',
        currency_code: settings?.currency_code || 'USD',
        currency_symbol: settings?.currency_symbol || '$',
    });

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('logo', file);
        if (logoPreview) URL.revokeObjectURL(logoPreview);
        setLogoPreview(file ? URL.createObjectURL(file) : null);
    };

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('icon', file);
        if (iconPreview) URL.revokeObjectURL(iconPreview);
        setIconPreview(file ? URL.createObjectURL(file) : null);
    };

    const handleBrokerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData((prev: any) => ({
            ...prev,
            broker_image: file,
            remove_broker_image: '0'
        }));
        if (brokerPreview) URL.revokeObjectURL(brokerPreview);
        setBrokerPreview(file ? URL.createObjectURL(file) : null);
    };

    const handleLogoClick = () => {
        logoInputRef.current?.click();
    };

    const handleIconClick = () => {
        iconInputRef.current?.click();
    };

    const handleBrokerClick = () => {
        brokerInputRef.current?.click();
    };

    const removeLogo = () => {
        if (logoPreview) URL.revokeObjectURL(logoPreview);
        setLogoPreview(null);
        setData('logo', null);
        if (logoInputRef.current) logoInputRef.current.value = '';
    };

    const removeIcon = () => {
        if (iconPreview) URL.revokeObjectURL(iconPreview);
        setIconPreview(null);
        setData('icon', null);
        if (iconInputRef.current) iconInputRef.current.value = '';
    };

    const removeBrokerImage = () => {
        if (brokerPreview) URL.revokeObjectURL(brokerPreview);
        setBrokerPreview(null);
        setData((prev: any) => ({
            ...prev,
            broker_image: null,
            remove_broker_image: '1'
        }));
        if (brokerInputRef.current) brokerInputRef.current.value = '';
    };

    const existingLogoSrc = settings?.logo_path ? (settings.logo_path.startsWith('http') ? settings.logo_path : `/${settings.logo_path}`) : null;
    const existingIconSrc = settings?.icon_path ? (settings.icon_path.startsWith('http') ? settings.icon_path : `/${settings.icon_path}`) : null;
    const existingBrokerSrc = settings?.broker_image_path ? (settings.broker_image_path.startsWith('http') ? settings.broker_image_path : `/${settings.broker_image_path}`) : null;

    const displayLogoSrc = logoPreview ?? existingLogoSrc;
    const displayIconSrc = iconPreview ?? existingIconSrc;
    const displayBrokerSrc = brokerPreview ?? existingBrokerSrc;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
            onSuccess: () => {
                // Clear previews on success
                if (logoPreview) URL.revokeObjectURL(logoPreview);
                if (iconPreview) URL.revokeObjectURL(iconPreview);
                if (brokerPreview) URL.revokeObjectURL(brokerPreview);
                setLogoPreview(null);
                setIconPreview(null);
                setBrokerPreview(null);
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
                    <p className="text-muted-foreground">Manage your website's global settings, contact details, currency, and stats.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* General Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>General Information</CardTitle>
                            <CardDescription>Update your company branding, name, and currency settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Logo Upload */}
                                <div className="space-y-2 flex flex-col items-center">
                                    <input
                                        ref={logoInputRef}
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={handleLogoChange}
                                        className="hidden"
                                    />
                                    
                                    <div className="flex flex-col items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={handleLogoClick}
                                            className="group relative cursor-pointer focus:outline-none"
                                        >
                                            <div className="border-2 border-dashed border-zinc-300 hover:border-orange-400 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900 transition-all group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 w-40 h-40 flex items-center justify-center">
                                                {displayLogoSrc ? (
                                                    <img
                                                        src={displayLogoSrc}
                                                        alt="Logo Preview"
                                                        className="max-w-full max-h-full object-contain"
                                                    />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2 text-zinc-400">
                                                        <ImageIcon className="w-8 h-8" />
                                                        <span className="text-xs">Upload Logo</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                <Upload className="h-6 w-6 text-white" />
                                            </div>
                                        </button>
                                        
                                        {displayLogoSrc && (
                                            <button
                                                type="button"
                                                onClick={removeLogo}
                                                className="flex items-center gap-1 text-xs text-red-500 transition-colors hover:text-red-700"
                                            >
                                                <X className="h-3 w-3" /> Remove Logo
                                            </button>
                                        )}
                                        {logoPreview && <p className="text-xs text-orange-500">New logo selected</p>}
                                        {errors.logo && <p className="text-xs text-red-500">{errors.logo}</p>}
                                        <p className="text-muted-foreground text-xs text-center">Click to upload brand logo (PNG/JPG)</p>
                                    </div>
                                </div>

                                {/* Icon/Favicon Upload */}
                                <div className="space-y-2 flex flex-col items-center">
                                    <input
                                        ref={iconInputRef}
                                        type="file"
                                        accept="image/png"
                                        onChange={handleIconChange}
                                        className="hidden"
                                    />
                                    
                                    <div className="flex flex-col items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={handleIconClick}
                                            className="group relative cursor-pointer focus:outline-none"
                                        >
                                            <div className="border-2 border-dashed border-zinc-300 hover:border-orange-400 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900 transition-all group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 w-40 h-40 flex items-center justify-center">
                                                {displayIconSrc ? (
                                                    <img
                                                        src={displayIconSrc}
                                                        alt="Icon Preview"
                                                        className="max-w-full max-h-full object-contain"
                                                    />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2 text-zinc-400">
                                                        <ImageIcon className="w-8 h-8" />
                                                        <span className="text-xs">Upload Icon</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                <Upload className="h-6 w-6 text-white" />
                                            </div>
                                        </button>
                                        
                                        {displayIconSrc && (
                                            <button
                                                type="button"
                                                onClick={removeIcon}
                                                className="flex items-center gap-1 text-xs text-red-500 transition-colors hover:text-red-700"
                                            >
                                                <X className="h-3 w-3" /> Remove Icon
                                            </button>
                                        )}
                                        {iconPreview && <p className="text-xs text-orange-500">New icon selected</p>}
                                        {errors.icon && <p className="text-xs text-red-500">{errors.icon}</p>}
                                        <p className="text-muted-foreground text-xs text-center">Click to upload favicon (PNG only)</p>
                                    </div>
                                </div>

                                {/* Company Name & Currency */}
                                <div className="space-y-4">
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

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="currency_code">Currency Code</Label>
                                            <select
                                                id="currency_code"
                                                value={data.currency_code}
                                                onChange={(e) => setData('currency_code', e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="USD">USD ($)</option>
                                                <option value="EUR">EUR (€)</option>
                                                <option value="GBP">GBP (£)</option>
                                                <option value="BDT">BDT (৳)</option>
                                                <option value="INR">INR (₹)</option>
                                                <option value="AED">AED (د.إ)</option>
                                                <option value="SAR">SAR (ر.س)</option>
                                                <option value="CAD">CAD ($)</option>
                                                <option value="AUD">AUD ($)</option>
                                            </select>
                                            {errors.currency_code && <p className="text-xs text-red-500">{errors.currency_code}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="currency_symbol">Currency Symbol</Label>
                                            <Input
                                                id="currency_symbol"
                                                value={data.currency_symbol}
                                                onChange={(e) => setData('currency_symbol', e.target.value)}
                                                placeholder="e.g., $, €, ৳"
                                            />
                                            {errors.currency_symbol && <p className="text-xs text-red-500">{errors.currency_symbol}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Broker Profile */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Broker Profile</CardTitle>
                            <CardDescription>Update your broker details shown on property pages.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {/* Broker Image Upload */}
                                <div className="space-y-2 md:col-span-1 flex flex-col items-center">
                                    <input
                                        ref={brokerInputRef}
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={handleBrokerChange}
                                        className="hidden"
                                    />
                                    
                                    <div className="flex flex-col items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={handleBrokerClick}
                                            className="group relative cursor-pointer focus:outline-none"
                                        >
                                            <div className="border-2 border-dashed border-zinc-300 hover:border-orange-400 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900 transition-all group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 w-40 h-40 flex items-center justify-center">
                                                {displayBrokerSrc ? (
                                                    <img
                                                        src={displayBrokerSrc}
                                                        alt="Broker Preview"
                                                        className="max-w-full max-h-full object-contain rounded-md"
                                                    />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2 text-zinc-400">
                                                        <ImageIcon className="w-8 h-8" />
                                                        <span className="text-xs">Upload Photo</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                <Upload className="h-6 w-6 text-white" />
                                            </div>
                                        </button>
                                        
                                        {displayBrokerSrc && (
                                            <button
                                                type="button"
                                                onClick={removeBrokerImage}
                                                className="flex items-center gap-1 text-xs text-red-500 transition-colors hover:text-red-700"
                                            >
                                                <X className="h-3 w-3" /> Remove Photo
                                            </button>
                                        )}
                                        {brokerPreview && <p className="text-xs text-orange-500">New photo selected</p>}
                                        {errors.broker_image && <p className="text-xs text-red-500">{errors.broker_image}</p>}
                                        <p className="text-muted-foreground text-xs text-center">Click to upload broker image</p>
                                    </div>
                                </div>

                                <div className="space-y-2 md:col-span-3">
                                    <Label htmlFor="broker_name">Broker Name</Label>
                                    <Input
                                        id="broker_name"
                                        value={data.broker_name}
                                        onChange={(e) => setData('broker_name', e.target.value)}
                                        placeholder="e.g., Sarah Jenkins"
                                    />
                                    {errors.broker_name && <p className="text-xs text-red-500">{errors.broker_name}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Company Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Company Statistics</CardTitle>
                            <CardDescription>Stats rendered on the Home and About pages.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="years_of_experience">Years of Experience</Label>
                                    <Input
                                        id="years_of_experience"
                                        type="number"
                                        value={data.years_of_experience}
                                        onChange={(e) => setData('years_of_experience', e.target.value)}
                                        placeholder="e.g., 15"
                                    />
                                    {errors.years_of_experience && <p className="text-xs text-red-500">{errors.years_of_experience}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="building_finished">Buildings Finished</Label>
                                    <Input
                                        id="building_finished"
                                        type="number"
                                        value={data.building_finished}
                                        onChange={(e) => setData('building_finished', e.target.value)}
                                        placeholder="e.g., 120"
                                    />
                                    {errors.building_finished && <p className="text-xs text-red-500">{errors.building_finished}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="satisfied_clients">Satisfied Clients</Label>
                                    <Input
                                        id="satisfied_clients"
                                        type="number"
                                        value={data.satisfied_clients}
                                        onChange={(e) => setData('satisfied_clients', e.target.value)}
                                        placeholder="e.g., 950"
                                    />
                                    {errors.satisfied_clients && <p className="text-xs text-red-500">{errors.satisfied_clients}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="expert_agents">Expert Agents</Label>
                                    <Input
                                        id="expert_agents"
                                        type="number"
                                        value={data.expert_agents}
                                        onChange={(e) => setData('expert_agents', e.target.value)}
                                        placeholder="e.g., 45"
                                    />
                                    {errors.expert_agents && <p className="text-xs text-red-500">{errors.expert_agents}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* About details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>About Company Details</CardTitle>
                            <CardDescription>Story, Mission, and Vision text displayed on the About Us page.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="our_journey">Our Journey (Introduction)</Label>
                                <textarea
                                    id="our_journey"
                                    value={data.our_journey}
                                    onChange={(e) => setData('our_journey', e.target.value)}
                                    rows={4}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Describe the company's background and achievements..."
                                />
                                {errors.our_journey && <p className="text-xs text-red-500">{errors.our_journey}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="our_mission">Our Mission</Label>
                                    <textarea
                                        id="our_mission"
                                        value={data.our_mission}
                                        onChange={(e) => setData('our_mission', e.target.value)}
                                        rows={4}
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Our core mission statement..."
                                    />
                                    {errors.our_mission && <p className="text-xs text-red-500">{errors.our_mission}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="our_vision">Our Vision</Label>
                                    <textarea
                                        id="our_vision"
                                        value={data.our_vision}
                                        onChange={(e) => setData('our_vision', e.target.value)}
                                        rows={4}
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Our long-term vision..."
                                    />
                                    {errors.our_vision && <p className="text-xs text-red-500">{errors.our_vision}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
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
                                    <Label htmlFor="google_map_iframe">Google Maps Iframe / URL</Label>
                                    <Input
                                        id="google_map_iframe"
                                        value={data.google_map_iframe}
                                        onChange={(e) => setData('google_map_iframe', e.target.value)}
                                        placeholder='<iframe src="..."></iframe> OR https://www.google.com/maps/embed?...'
                                    />
                                    {errors.google_map_iframe && <p className="text-xs text-red-500">{errors.google_map_iframe}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Social Media Links */}
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