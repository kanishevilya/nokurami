import { PropsWithChildren } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/Card";
import Image from "next/image";
import { Button } from "@/components/ui/shadcn/Button";
import Link from "next/link";

interface AuthWrapperProps {
    heading: string
    backButtonLabel?: string
    backButtonHref?: string
}

export function AuthWrapper({ children, heading, backButtonLabel, backButtonHref }: PropsWithChildren<AuthWrapperProps>) {
    return <div className="flex h-full items-start justify-center">
        <Card className="w-[450px]">
            <CardHeader className="flex flex-row items-center justify-center gap-x-4">
                <Image src="/images/лого (1).svg" alt="logo" width={40} height={40} />
                <CardTitle className="text-2xl font-bold">{heading}</CardTitle>
            </CardHeader>
            <CardContent className="-mt-2">
                {children}
                {backButtonLabel && backButtonHref && (
                    <Button variant='ghost' className='w-full'>
                        <Link href={backButtonHref}>{backButtonLabel}</Link>
                    </Button>
                )}
            </CardContent>
        </Card>
        </div>
}
