interface AppLogoIconProps {
    className?: string;
}

export default function AppLogoIcon({ className }: AppLogoIconProps) {
    return <>
        <img src="/assets/images/icon.png" className={className || 'size-5'}  />
    </>
}
