import Image from "next/image";

export function Logo({ width = 40, height = 40, theme = 'dark' }: { width?: number; height?: number, theme?: string }) {
   
    return (   
        <Image 
        src={theme === 'dark' 
            ? "/images/logo-white.svg" 
            : "/images/logo-primary.svg"} 
        alt="logo" 
        width={width} 
        height={height} 
        />
    );
}