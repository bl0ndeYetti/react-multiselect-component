import React from 'react';
export type MultiSelectProps<T> = {
    selectedItems: T[];
    onSelectedItemsChange: (selectedItems: T[]) => void;
    data: T[];
    labelExtractor: (item: T) => string;
    valueExtractor: (item: T) => any;
    placeholder?: string;
    clearButtonLabel?: string;
    closeButtonLabel?: string;
    onClose?: () => void;
};
declare const MultiSelect: <T>({ selectedItems, onSelectedItemsChange, data, labelExtractor, valueExtractor, placeholder, clearButtonLabel, closeButtonLabel, onClose, }: MultiSelectProps<T>) => React.JSX.Element;
export default MultiSelect;
