export type PromiseType<T> = T extends PromiseLike<infer U> ? PromiseType<U> : T;
