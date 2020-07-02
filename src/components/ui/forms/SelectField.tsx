/** @jsx createElement */
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import escapeStringRegexp from "escape-string-regexp";
import { useField } from "formik";
import {
  FocusEvent,
  KeyboardEvent,
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

type SelectFieldProps = {
  creatable?: boolean;
  label: string;
  name: string;
  optionKey: string;
  optionValue: string;
  options: unknown[];
};

const SelectField = ({
  creatable,
  label,
  name,
  optionKey,
  optionValue,
  options,
}: SelectFieldProps) => {
  const dropdownRef = useRef();
  const { handleClose, handleOpen, isOpen } = useOpenHandler(dropdownRef);
  const [field, meta, helpers] = useField<string>({
    name,
    type: "string",
  });

  const [hasFocus, setHasFocus] = useState(false);
  const hasFieldError = hasError<string>(meta) && !isOpen;

  const displayValue = useMemo(() => {
    const selected = options.find(
      (option) => option[optionKey] === field.value
    );

    if (!selected) {
      return field.value;
    }

    return selected[optionValue];
  }, [field.value, optionKey, optionValue, options]);

  const hasExactMatch = useMemo(() => {
    return options.find((option) => {
      const value = option[optionValue];

      return value === displayValue;
    });
  }, [displayValue, optionValue, options]);

  const matches = useMemo(() => {
    if (!displayValue) {
      return options;
    }

    const regex = new RegExp(escapeStringRegexp(displayValue), "gi");

    return options.filter((option) => {
      const value = option[optionValue];

      return regex.test(value);
    });
  }, [displayValue, optionValue, options]);

  const handleBlur = useCallback(
    (event: FocusEvent) => {
      setHasFocus(false);
      field.onBlur(event);

      if (!creatable && !hasExactMatch) {
        helpers.setValue("");
      }
    },
    [creatable, field, hasExactMatch, helpers]
  );

  const handleKeyPres = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        if (!hasExactMatch && matches.length > 0) {
          const match = matches[0];
          const value = match[optionValue];

          helpers.setValue(value);
        }

        handleClose();
      } else {
        handleOpen();
      }
    },
    [handleClose, handleOpen, hasExactMatch, helpers, matches, optionValue]
  );

  const handleOptionClick = useCallback(
    (value: string) => {
      handleClose();
      helpers.setValue(value);
    },
    [handleClose, helpers]
  );

  const shouldShowAddOption = creatable && field.value && !hasExactMatch;
  const shouldShowDropdown =
    isOpen && ((creatable && displayValue) || matches.length > 0);

  return (
    <Theme>
      {({ animations, colors }) => (
        <FormGroup
          error={meta.error}
          hasError={hasFieldError}
          label={label}
          labelFor={name}
        >
          <div
            className={classNames(
              animations.default,
              "border border-b-2",
              {
                [`border-${colors.grayLight}`]: !hasFieldError && !hasFocus,
                [`border-${colors.primary}`]: !hasFieldError && hasFocus,
                [`border-${colors.red}`]: hasFieldError && !hasFocus,
              },
              "flex rounded"
            )}
            onClick={() => handleOpen()}
          >
            <input
              {...field}
              className={`appearance-none px-3 py-2 rounded text-${colors.gray} w-full focus:outline-none`}
              id={name}
              onFocus={() => setHasFocus(true)}
              onBlur={handleBlur}
              onKeyPress={handleKeyPres}
              placeholder={label}
              type="string"
              value={displayValue}
            />

            <div className="px-3 py-2">
              <FontAwesomeIcon
                className={classNames({
                  [`border-${colors.grayLight}`]: !hasFieldError && !hasFocus,
                  [`border-${colors.primary}`]: !hasFieldError && hasFocus,
                  [`border-${colors.red}`]: hasFieldError && !hasFocus,
                })}
                icon={faCaretDown}
              />
            </div>
          </div>

          {shouldShowDropdown && (
            <div className="relative" ref={dropdownRef}>
              <Dropdown isOpen={isOpen} width="full">
                <div className="max-h-sm overflow-scroll py-1 text-left">
                  {matches.map((option) => {
                    const key = option[optionKey];
                    const value = option[optionValue];

                    return (
                      <div
                        className={`cursor-pointer px-4 py-1 hover:bg-${colors.grayLighter}`}
                        key={key}
                        onClick={() => handleOptionClick(key)}
                      >
                        <Highlighter
                          id={key}
                          query={field.value}
                          value={value}
                        />
                      </div>
                    );
                  })}

                  {shouldShowAddOption && (
                    <div
                      className={`${
                        matches.length > 0 &&
                        `border-t border-${colors.grayLight}`
                      } cursor-pointer px-4 py-1 hover:bg-${
                        colors.grayLighter
                      }`}
                      onClick={handleClose}
                    >
                      <span>Add &quot;</span>
                      <span className="font-semibold">{field.value}</span>
                      <span>&quot;</span>
                    </div>
                  )}
                </div>
              </Dropdown>
            </div>
          )}
        </FormGroup>
      )}
    </Theme>
  );
};

export default SelectField;
