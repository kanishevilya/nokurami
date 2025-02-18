import { PropsWithChildren } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/Card";
import { Button } from "@/components/ui/shadcn/Button";
import Link from "next/link";
import { Logo } from "@/components/ui/items/Logo";
import { useTheme } from "next-themes";
interface AuthWrapperProps {
    heading: string
    backButtonLabel?: string
    backButtonHref?: string
}

export function AuthWrapper({ children, heading, backButtonLabel, backButtonHref }: PropsWithChildren<AuthWrapperProps>) {
    return <div className="flex h-full items-center justify-center">
        <Card className="w-[450px]">
            <CardHeader className="flex flex-row items-center justify-center gap-x-4">
                <Logo theme={useTheme().theme}/>
                <CardTitle className="text-2xl font-bold">{heading}</CardTitle>
            </CardHeader>
            <CardContent className="-mt-2">
                {children}
                {backButtonLabel && backButtonHref && (
                    <Button variant='ghost' className='w-full mt-4'>
                        <Link href={backButtonHref}>{backButtonLabel}</Link>
                    </Button>
                )}
            </CardContent>
        </Card>
        </div>
}
