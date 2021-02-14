export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : never;

export type ArrayType<T extends Array<any>> = T extends Array<infer U> ? U : never;

export type FromNullableArray<T> = T extends Array<any> ? T[0] : never;

