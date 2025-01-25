import { FactoryProvider, ModuleMetadata } from "@nestjs/common"

export const LiveKitOptionsSymbol = Symbol("LiveKitOptionsSymbol")

export type TypeLiveKitOptions = {
    apiUrl: string,
    apiKey: string,
    apiSecret: string
}

export type TypeLiveKitAsyncOptions = Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider<TypeLiveKitOptions>, 'useFactory' | 'inject'>