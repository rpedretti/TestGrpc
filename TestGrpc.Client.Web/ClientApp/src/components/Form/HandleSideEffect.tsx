import * as React from 'react';
import { Field } from 'react-final-form'
import { HandleSideEffectProps, HandleSideEffectObserverProps } from './types';
import genericMemo from 'common/utils/genericMemo';

const HandleSideEffectObserver = <T extends any>(props: HandleSideEffectObserverProps<T>) => {
    const {
        input,
        meta,
        onBlur,
        onChange,
        onFocus,
    } = props;

    const active = meta?.active;
    const value = input.value;

    const [previousValue, setPreviousValue] = React.useState(value);
    const [previousFocused, setPreviousFocused] = React.useState(!!active);
    const [previousBlured, setPreviousBlured] = React.useState(!!active);

    React.useEffect(() => {
        if (value !== previousValue) {
            onChange?.(value, previousValue);
            setPreviousValue(value);
        }
    }, [value, previousValue, onChange]);

    React.useEffect(() => {
        if (previousBlured && !active) {
            onBlur?.();
        }

        if (previousBlured !== active) {
            setPreviousBlured(!!active);
        }
    }, [active, previousBlured, onBlur]);

    React.useEffect(() => {
        if (active && !previousFocused) {
            setPreviousFocused(active);
            onFocus?.();
        } else if (!active && previousFocused) {
            setPreviousFocused(!!active);
        }
    }, [active, previousFocused, onFocus]);

    return null;
}

const HandleSideEffect = <T extends any>(props: HandleSideEffectProps<T>) => (
    React.createElement(Field, {
        name: props.name,
        subscription: props.subscription,
        // eslint-disable-next-line react/display-name
        render: p => React.createElement<HandleSideEffectObserverProps<T>>(HandleSideEffectObserver, {
            meta: p.meta,
            input: p.input,
            onBlur: props.onBlur,
            onChange: props.onChange,
            onFocus: props.onFocus,
        }),
    })
);

HandleSideEffect.defaultProps = {
    subscription: { value: true, active: true },
}

export default genericMemo(HandleSideEffect);