'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var lucideReact = require('lucide-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var MultiSelect = function (_a) {
    var selectedItems = _a.selectedItems, onSelectedItemsChange = _a.onSelectedItemsChange, data = _a.data, labelExtractor = _a.labelExtractor, valueExtractor = _a.valueExtractor, _b = _a.placeholder, placeholder = _b === void 0 ? 'Select items' : _b, _c = _a.clearButtonLabel, clearButtonLabel = _c === void 0 ? 'Clear' : _c, _d = _a.closeButtonLabel, closeButtonLabel = _d === void 0 ? 'Close' : _d, onClose = _a.onClose;
    var _e = React.useState(false), isOpen = _e[0], setIsOpen = _e[1];
    var _f = React.useState(''), searchTerm = _f[0], setSearchTerm = _f[1];
    var filteredItems = React.useMemo(function () {
        var lowercasedFilter = searchTerm.toLowerCase();
        return data.filter(function (item) {
            return labelExtractor(item).toLowerCase().includes(lowercasedFilter);
        });
    }, [searchTerm, data, labelExtractor]);
    var selectedItemsLabel = React.useMemo(function () {
        return selectedItems
            .map(labelExtractor)
            .filter(Boolean)
            .join(', ');
    }, [selectedItems, labelExtractor]);
    var handleItemChange = function (item) {
        var itemValue = valueExtractor(item);
        var isSelected = selectedItems.some(function (selected) {
            return valueExtractor(selected) === itemValue;
        });
        var newSelectedItems = isSelected
            ? selectedItems.filter(function (selected) { return valueExtractor(selected) !== itemValue; })
            : __spreadArray(__spreadArray([], selectedItems, true), [item], false);
        onSelectedItemsChange(newSelectedItems);
    };
    var toggleDropdown = function () {
        if (isOpen && onClose)
            onClose();
        setIsOpen(!isOpen);
    };
    var handleSearchChange = function (e) {
        return setSearchTerm(e.target.value);
    };
    var clearSelection = function () { return onSelectedItemsChange([]); };
    return (React__default["default"].createElement("div", { className: "relative w-full max-w-[600px]" },
        React__default["default"].createElement("button", { onClick: toggleDropdown, className: "w-full justify-between", "aria-haspopup": "listbox", "aria-expanded": isOpen },
            React__default["default"].createElement("span", { className: "truncate" }, selectedItems.length ? selectedItemsLabel : placeholder),
            isOpen ? (React__default["default"].createElement(lucideReact.ChevronUp, { className: "ml-2 h-4 w-4 flex-shrink-0" })) : (React__default["default"].createElement(lucideReact.ChevronDown, { className: "ml-2 h-4 w-4 flex-shrink-0" }))),
        isOpen && (React__default["default"].createElement("div", { className: "absolute z-10 w-full mt-1 bg-white border rounded-md shadow-md" },
            React__default["default"].createElement("div", { className: "p-2" },
                React__default["default"].createElement("input", { type: "text", placeholder: "Search...", value: searchTerm, onChange: handleSearchChange, className: "mb-2 w-full" })),
            React__default["default"].createElement("div", { className: "max-h-[300px] overflow-auto p-2" }, filteredItems.map(function (item) {
                var itemValue = valueExtractor(item);
                var isSelected = selectedItems.some(function (selected) { return valueExtractor(selected) === itemValue; });
                return (React__default["default"].createElement("div", { key: itemValue, className: "flex items-center space-x-2 py-1" },
                    React__default["default"].createElement("input", { type: "checkbox", id: "item-".concat(itemValue), checked: isSelected, onChange: function () { return handleItemChange(item); } }),
                    React__default["default"].createElement("label", { htmlFor: "item-".concat(itemValue), className: "text-sm cursor-pointer" }, labelExtractor(item))));
            })),
            React__default["default"].createElement("div", { className: "p-2 border-t flex justify-between items-center" },
                React__default["default"].createElement("span", { className: "text-sm text-gray-500" },
                    selectedItems.length,
                    " selected"),
                React__default["default"].createElement("button", { onClick: clearSelection },
                    React__default["default"].createElement(lucideReact.X, { className: "h-4 w-4 mr-1" }),
                    " ",
                    clearButtonLabel),
                React__default["default"].createElement("button", { onClick: toggleDropdown }, closeButtonLabel))))));
};

exports.MultiSelect = MultiSelect;
