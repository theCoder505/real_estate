import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, LayoutGrid, Settings, Building2, Star, Users, Mail, Shield, Send } from 'lucide-react';
import AppLogo from './app-logo';

function safeRoute(name: string): string {
    try {
        return route(name);
    } catch {
        return '';
    }
}

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { url } = usePage();
    
    // Get the path without domain
    const currentPath = new URL(url, window.location.origin).pathname;

    const mainNavItems: NavItem[] = [
        { title: 'Dashboard',    url: safeRoute('admin.dashboard'),          icon: LayoutGrid },
        { title: 'Properties',   url: safeRoute('admin.properties.index'),   icon: Building2  },
        { title: 'Blog Posts',   url: safeRoute('admin.blog.index'),         icon: BookOpen   },
        { title: 'Facilities',   url: safeRoute('admin.facilities.index'),   icon: Star       },
        { title: 'Testimonials', url: safeRoute('admin.testimonials.index'), icon: Users      },
        { title: 'Team Members', url: safeRoute('admin.team-members.index'), icon: Shield     },
        { title: 'Newsletter',   url: safeRoute('admin.newsletter.index'),   icon: Send       },
        { title: 'Messages',     url: safeRoute('admin.contact.index'),      icon: Mail       },
        { title: 'Settings',     url: safeRoute('admin.settings.edit'),      icon: Settings   },
    ]
        .filter((item) => item.url !== '')
        .map((item) => {
            const isDashboard = item.title === 'Dashboard';
            let isActive = false;
            
            if (isDashboard) {
                // Dashboard is active on exact match
                isActive = currentPath === item.url || currentPath === '/admin/dashboard';
            } else {
                // For other routes, check if current path starts with the item's URL
                isActive = currentPath.startsWith(item.url) && item.url !== '';
            }
            
            return { ...item, isActive };
        });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        {/* Remove isActive from logo - it shouldn't show as active */}
                        <SidebarMenuButton size="lg" asChild tooltip="Dashboard">
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}