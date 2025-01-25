import { DynamicModule, Module } from '@nestjs/common';
import { LiveKitOptionsSymbol, TypeLiveKitAsyncOptions, TypeLiveKitOptions } from './types/livekit.types';
import { LivekitService } from './livekit.service';

@Module({})
export class LivekitModule {
  public static register(options: TypeLiveKitOptions): DynamicModule {
    return {
      module: LivekitModule,
      providers: [
        {
          provide: LiveKitOptionsSymbol,
          useValue: options
        },
        LivekitService
      ],
      exports: [LivekitService],
      global: true
    }
  }

  public static registerAsync(options: TypeLiveKitAsyncOptions): DynamicModule {
    return {
      module: LivekitModule,
      imports: options.imports || [],
      providers: [
        {
          provide: LiveKitOptionsSymbol,
          useFactory: options.useFactory,
          inject: options.inject || []
        },
        LivekitService
      ],
      exports: [LivekitService],
      global: true
    }
  }
}
