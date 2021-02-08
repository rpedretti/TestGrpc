export interface HandleSideEffectProps<T> {
    name: string;
    dependencies?: string[];
    onChange?: (value: T, previous: T, dependencies?: any[]) => void;
    onBlur?: () => void;
    onFocus?: () => void;
}

export interface HandleSideEffectObserverProps<T> {
    input: { value: T };
    meta?: { active?: boolean };
    dependencies?: string[];
    onChange?: (value: T, previous: T, dependencies?: any[]) => void;
    onBlur?: () => void;
    onFocus?: () => void;
}
