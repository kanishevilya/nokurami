import { z } from 'zod';

export enum IngressType {
    RTMP = 0,
    WHIP = 1,
}

export const createIngressSchema = z.object({
    ingressType: z.nativeEnum(IngressType),
});

export type TypeCreateIngressSchema = z.infer<typeof createIngressSchema>; 