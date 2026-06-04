import { useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import toast from 'react-hot-toast';

export default function FlashMessage() {
    const { props } = usePage<SharedData>();
    const flash = props.flash;
    
    const lastSuccess = useRef<string | null | undefined>(null);
    const lastError = useRef<string | null | undefined>(null);

    useEffect(() => {
        if (flash?.success && flash.success !== lastSuccess.current) {
            toast.success(flash.success, {
                position: 'top-right',
                duration: 5000,
                style: {
                    background: '#1e293b',
                    color: '#f8fafc',
                    borderRadius: '8px',
                },
            });
            lastSuccess.current = flash.success;
        } else if (!flash?.success) {
            lastSuccess.current = null;
        }

        if (flash?.error && flash.error !== lastError.current) {
            toast.error(flash.error, {
                position: 'top-right',
                duration: 5000,
                style: {
                    background: '#1e293b',
                    color: '#f8fafc',
                    borderRadius: '8px',
                },
            });
            lastError.current = flash.error;
        } else if (!flash?.error) {
            lastError.current = null;
        }
    }, [flash]);

    return null;
}
