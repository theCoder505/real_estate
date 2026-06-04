import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    const { settings } = usePage<any>().props;

    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-md">
                <img src="/assets/images/icon.png" className="h-12" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">
                    {settings?.company_name || 'Venture Builders'}
                </span>
            </div>
        </>
    );
}
