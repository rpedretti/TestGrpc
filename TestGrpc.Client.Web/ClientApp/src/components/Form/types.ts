import type { FieldSubscription, FormApi } from 'final-form';

export interface HandleSideEffectProps<T> {
    name: string;
    subscription?: FieldSubscription;
    onChange?: (value: T, previous: T) => void;
    onBlur?: () => void;
    onFocus?: () => void;
}

export interface HandleSideEffectObserverProps<T> {
    input: { value: T };
    meta?: { active?: boolean };
    dependencies?: string[];
    onChange?: (value: T, previous: T) => void;
    onBlur?: () => void;
    onFocus?: () => void;
}


type ChangeFunction<T = Record<string, any>, U = any> = FormApi<T & Record<string, U>>["change"];

export type {
    ChangeFunction,
}
