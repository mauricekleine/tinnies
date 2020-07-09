/** @jsx createElement */
import { faCaretDown, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import escapeStringRegexp from "escape-string-regexp";
import { useField } from "formik";
import {
  ChangeEvent,
  createElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import Dropdown from "../Dropdown";
import Highlighter from "../Highlighter";
import Theme from "../theme";
import { useOpenHandler } from "../utils";

import FormGroup from "./FormGroup";
import { hasError } from "./utils";

type MultiSelectFieldProps = {
  label: string;
  name: string;
  optionKey: string;
  optionValue: string;
  options: unknown[];
};

const MultiSelectField = ({
  label,
  name,
  options,
  optionKey,
  optionValue,
}: MultiSelectFieldProps) => {
  const dropdownRef = useRef();
  const { handleOpen, isOpen } = useOpenHandler(dropdownRef);
  const [field, meta, helpers] = useField<Array<unknown>>({
    name,
  });

  const [query, setQuery] = useState("");
  const hasFieldError = hasError<Array<unknown>>(meta) && !isOpen;

  const displayValue = useMemo(() => {
    return options
      .filter((option) => field.value.includes(option[optionKey]))
      .map((option) => option[optionValue])
      .join(", ");
  }, [field.value, optionKey, optionValue, options]);

  const matches = useMemo(() => {
    if (!query) {
      return options;
    }

    const regex = new RegExp(escapeStringRegexp(query), "gi");

    return options.filter((option) => {
      const value = option[optionValue];

      return regex.test(value);
    });
  }, [optionValue, options, query]);

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const handleOptionClick = useCallback(
    (value: string) => {
      const index = field.value.indexOf(value);

      if (index > -1) {
        const fieldValue = [...field.value];
        fieldValue.splice(index, 1);
        helpers.setValue([...fieldValue]);
      } else {
        helpers.setValue([...field.value, value]);
      }
    },
    [field.value, helpers]
  );

  return (
    <Theme>
      {({ animations, bg, border, text }) => (
        <FormGroup
          error={meta.error}
          hasError={hasFieldError}
          label={label}
          hintText={field.value.length > 0 && `${field.value.length} selected`}
          labelFor={name}
        >
          <div
            className={classNames(
              animations.default,
              {
                [border.colors.default]: !hasFieldError && !isOpen,
                [border.colors.primary]: !hasFieldError && isOpen,
                [border.colors.red]: hasFieldError,
              },
              "border border-b-2 flex rounded"
            )}
            onClick={() => handleOpen()}
          >
            <input
              className="appearance-none cursor-pointer px-3 py-2 rounded truncate w-full focus:outline-none"
              id={name}
              placeholder={label}
              readOnly
              type="string"
              value={displayValue}
            />

            <div className="px-3 py-2">
              <FontAwesomeIcon
                className={classNames({
                  [border.colors.default]: !hasFieldError && !isOpen,
                  [border.colors.primary]: !hasFieldError && isOpen,
                  [border.colors.red]: hasFieldError,
                })}
                icon={faCaretDown}
              />
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <Dropdown isOpen={isOpen}>
              <div className="max-h-sm overflow-scroll pb-1 text-left">
                <div className={classNames(animations.default, "border-b-2")}>
                  <input
                    autoFocus
                    className="appearance-none px-3 py-2 rounded w-full focus:outline-none"
                    id={name}
                    onChange={handleOnChange}
                    placeholder="Search..."
                    type="string"
                    value={query}
                  />
                </div>

                {matches.map((option) => {
                  const key = option[optionKey];
                  const value = option[optionValue];
                  const isSelected = field.value.includes(key);

                  return (
                    <div
                      className={classNames(
                        bg.hover.gray,
                        {
                          [`${text.colors.primary} font-semibold`]: isSelected,
                        },
                        "cursor-pointer flex items-center justify-between px-4 py-1"
                      )}
                      key={key}
                      onClick={() => handleOptionClick(key)}
                    >
                      <div className="truncate">
                        <Highlighter id={key} query={query} value={value} />
                      </div>

                      {isSelected && (
                        <FontAwesomeIcon
                          className="ml-1"
                          icon={faCheckCircle}
                        />
                      )}
                    </div>
                  );
                })}

                {matches.length === 0 && (
                  <div className="px-4 py-1">No results</div>
                )}
              </div>
            </Dropdown>
          </div>
        </FormGroup>
      )}
    </Theme>
  );
};

export default MultiSelectField;
