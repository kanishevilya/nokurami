import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class PubSubService extends PubSub {
    constructor() {
        super();
    }

    // Метод asyncIterator используется в подписках GraphQL
    asyncIterator<T>(triggers: string | string[]): AsyncIterator<T> {
        // @ts-expect-error - метод существует, но TS его не видит в типах
        return super.asyncIterator<T>(triggers);
    }
} 