import { PubSub } from 'graphql-subscriptions';

export class FilteredPubSub extends PubSub {
    constructor() {
        super();
    }

    // Метод для создания итератора с фильтрацией событий
    public async asyncIterator<T>(
        triggers: string | string[],
        options?: {
            filter?: (payload: T, variables: Record<string, any>) => boolean | Promise<boolean>;
        },
    ): Promise<AsyncIterator<T>> {
        // @ts-expect-error - родительский метод существует, но не в типах
        const asyncIterator = await super.asyncIterator<T>(triggers);

        if (options?.filter) {
            const { filter } = options;
            return this.filterAsyncIterator(asyncIterator, filter);
        }

        return asyncIterator;
    }

    private filterAsyncIterator<T>(
        asyncIterator: AsyncIterator<T>,
        filter: (payload: T, variables: Record<string, any>) => boolean | Promise<boolean>,
        variables?: Record<string, any>,
    ): AsyncIterator<T> {
        const getNextPromise = (): Promise<IteratorResult<T>> => {
            return asyncIterator
                .next()
                .then(async (payload: IteratorResult<T>) => {
                    if (payload.done === true) {
                        return payload;
                    }

                    const shouldInclude = await filter(payload.value, variables || {});

                    if (shouldInclude) {
                        return payload;
                    }

                    return getNextPromise();
                });
        };

        return {
            next(): Promise<IteratorResult<T>> {
                return getNextPromise();
            },
            return(): Promise<IteratorResult<T>> {
                return asyncIterator.return();
            },
            throw(error: any): Promise<IteratorResult<T>> {
                return asyncIterator.throw(error);
            },
            // @ts-expect-error - Symbol.asyncIterator должен быть реализован для AsyncIterator
            [Symbol.asyncIterator](): AsyncIterator<T> {
                return this;
            },
        };
    }
} 