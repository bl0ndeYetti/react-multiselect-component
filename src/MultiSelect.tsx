import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

export type MultiSelectProps<T> = {
  selectedItems: T[];
  onSelectedItemsChange: (selectedItems: T[]) => void;
  data: T[];
  labelExtractor: (item: T) => string;
  valueExtractor: (item: T) => any; // Assume a unique value like an ID
  placeholder?: string;
  clearButtonLabel?: string;
  closeButtonLabel?: string;
  onClose?: () => void;
};

const MultiSelect = <T,>({
  selectedItems,
  onSelectedItemsChange,
  data,
  labelExtractor,
  valueExtractor,
  placeholder = 'Select items',
  clearButtonLabel = 'Clear',
  closeButtonLabel = 'Close',
  onClose,
}: MultiSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    return data.filter((item) =>
      labelExtractor(item).toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm, data, labelExtractor]);

  const selectedItemsLabel = useMemo(() => {
    return selectedItems
      .map(labelExtractor)
      .filter(Boolean)
      .join(', ');
  }, [selectedItems, labelExtractor]);

  const handleItemChange = (item: T) => {
    const itemValue = valueExtractor(item);
    const isSelected = selectedItems.some((selected) =>
      valueExtractor(selected) === itemValue
    );

    const newSelectedItems = isSelected
      ? selectedItems.filter(
          (selected) => valueExtractor(selected) !== itemValue
        )
      : [...selectedItems, item];
    onSelectedItemsChange(newSelectedItems);
  };

  const toggleDropdown = () => {
    if (isOpen && onClose) onClose();
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const clearSelection = () => onSelectedItemsChange([]);

  return (
    <div className="relative w-full max-w-[600px]">
      <button
        onClick={toggleDropdown}
        className="w-full justify-between"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">
          {selectedItems.length ? selectedItemsLabel : placeholder}
        </span>
        {isOpen ? (
          <ChevronUp className="ml-2 h-4 w-4 flex-shrink-0" />
        ) : (
          <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-md">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="mb-2 w-full"
            />
          </div>
          <div className="max-h-[300px] overflow-auto p-2">
            {filteredItems.map((item) => {
              const itemValue = valueExtractor(item);
              const isSelected = selectedItems.some(
                (selected) => valueExtractor(selected) === itemValue
              );
              return (
                <div key={itemValue} className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    id={`item-${itemValue}`}
                    checked={isSelected}
                    onChange={() => handleItemChange(item)}
                  />
                  <label htmlFor={`item-${itemValue}`} className="text-sm cursor-pointer">
                    {labelExtractor(item)}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="p-2 border-t flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {selectedItems.length} selected
            </span>
            <button onClick={clearSelection}>
              <X className="h-4 w-4 mr-1" /> {clearButtonLabel}
            </button>
            <button onClick={toggleDropdown}>
              {closeButtonLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
