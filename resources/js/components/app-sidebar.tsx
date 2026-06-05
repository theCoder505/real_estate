import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, LayoutGrid, Settings, Building2, Star, Users, Mail, Shield, Send } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard',   url: route('admin.dashboard'),          icon: LayoutGrid  },
    { title: 'Properties',  url: route('admin.properties.index'),   icon: Building2   },
    { title: 'Blog Posts',  url: route('admin.blog.index'),         icon: BookOpen    },
    { title: 'Facilities',  url: route('admin.facilities.index'),   icon: Star        },
    { title: 'Testimonials',url: route('admin.testimonials.index'), icon: Users       },
    { title: 'Team Members',url: route('admin.team-members.index'), icon: Shield      },
    { title: 'Newsletter',  url: route('admin.newsletter.index'),   icon: Send        },
    { title: 'Messages',    url: route('admin.contact.index'),      icon: Mail        },
    { title: 'Settings',    url: route('admin.settings.edit'),      icon: Settings    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
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
