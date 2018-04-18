/**
 * HOC Components
 */
import * as React from 'react';
const { Iterable } = require('immutable');

/**
 * Convert immutable object from smart component to dumb component
 * @param WrappedComponent 
 */
const toJS = WrappedComponent => wrappedComponentProps => {
    const KEY = 0;
    const VALUE = 1;

    const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
        newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(
            wrappedComponentProp[VALUE]
        ) ? wrappedComponentProp[VALUE].toJS() : wrappedComponentProp[VALUE];

        return newProps;
    }, []);

    return <WrappedComponent { ...propsJS } />
}

export {
    toJS
}
