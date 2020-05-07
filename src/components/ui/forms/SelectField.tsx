import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import escapeStringRegexp from "escape-string-regexp";
import { useField } from "formik";
import React, {
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import useDropdown from "../../../hooks/useDropdown";
import Highlighter from "../Highlighter";
import colors from "../colors";

import FormGroup from "./FormGroup";
import { hasError } from "./utils";

type SelectFieldProps = {
  creatable?: boolean;
  getOptionKey: (option: unknown) => string;
  getOptionValue: (option: unknown) => string;
  label: string;
  name: string;
  options: unknown[];
};

const SelectField = ({
  creatable,
  getOptionKey,
  getOptionValue,
  label,
  options,
  name,
}: SelectFieldProps) => {
  const dropdownRef = useRef();
  const { dropdownProps, handleClose, handleOpen, isOpen } = useDropdown(
    dropdownRef
  );
  const [field, meta, helpers] = useField<string>({
    name,
    type: "string",
  });

  const [hasFocus, setHasFocus] = useState(false);
  const hasFieldError = hasError<string>(meta) && !isOpen;

  const hasExactMatch = useMemo(() => {
    return options.find((option) => {
      const value = getOptionValue(option);

      return value === field.value;
    });
  }, [field.value, getOptionValue, options]);

  const matches = useMemo(() => {
    const regex = new RegExp(`${escapeStringRegexp(field.value)}`, "gi");

    return options.filter((option) => {
      const value = getOptionValue(option);

      return regex.test(value);
    });
  }, [field.value, getOptionValue, options]);

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
          const value = getOptionValue(match);

          helpers.setValue(value);
        }

        handleClose();
      } else {
        handleOpen();
      }
    },
    [getOptionValue, handleClose, handleOpen, hasExactMatch, helpers, matches]
  );

  const handleOptionClick = useCallback(
    (value: string) => {
      handleClose();
      helpers.setValue(value);
    },
    [handleClose, helpers]
  );

  const shouldShowAddOption = creatable && field.value && !hasExactMatch;
  const shouldShowDropdown = isOpen && (creatable || matches.length > 0);

  const getColor = () => {
    if (hasFocus) {
      return colors.primary;
    }

    if (hasFieldError) {
      return colors.red;
    }

    return colors.grayLight;
  };

  return (
    <FormGroup
      error={meta.error}
      hasError={hasFieldError}
      label={label}
      labelFor={name}
    >
      <div
        className={`border border-b-2 border-${getColor()} flex rounded`}
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
        />

        <div className="px-3 py-2">
          <FontAwesomeIcon
            className={`text-${getColor()}`}
            icon={faCaretDown}
          />
        </div>
      </div>

      {shouldShowDropdown && (
        <div className="relative" ref={dropdownRef}>
          <div {...dropdownProps}>
            <div className="max-h-sm overflow-scroll py-1">
              {matches.map((option) => {
                const key = getOptionKey(option);
                const value = getOptionValue(option);

                return (
                  <div
                    className={`cursor-pointer px-4 py-1 hover:bg-${colors.grayLighter}`}
                    key={key}
                    onClick={() => handleOptionClick(value)}
                  >
                    <Highlighter id={key} query={field.value} value={value} />
                  </div>
                );
              })}

              {shouldShowAddOption && (
                <div
                  className={`${
                    matches.length > 0 && `border-t border-${colors.grayLight}`
                  } cursor-pointer px-4 py-1 hover:bg-${colors.grayLighter}`}
                  onClick={handleClose}
                >
                  <span>Add &quot;</span>
                  <span className="font-semibold">{field.value}</span>
                  <span>&quot;</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </FormGroup>
  );
};

export default SelectField;
