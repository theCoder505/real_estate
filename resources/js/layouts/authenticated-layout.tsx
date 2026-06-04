/**
 * AuthenticatedLayout — alias for the admin app layout (sidebar + header).
 * All admin pages import this for consistency.
 */
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import React from 'react';

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AuthenticatedLayout({ children, breadcrumbs, ...props }: AuthenticatedLayoutProps) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    );
}
