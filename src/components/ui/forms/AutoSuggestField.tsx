import { useField } from "formik";
import React, { useCallback, useMemo } from "react";

import Dropdown from "../Dropdown";
import Highlighter from "../Highlighter";
import colors from "../colors";

import FormGroup from "./FormGroup";
import { StandardInputField } from "./InputField";
import { hasError } from "./utils";

type AutoSuggestFieldProps = {
  getOptionKey: (option: unknown) => string;
  getOptionValue: (option: unknown) => string;
  label: string;
  name: string;
  options: unknown[];
};

const AutoSuggestField = ({
  getOptionKey,
  getOptionValue,
  label,
  options,
  name,
}: AutoSuggestFieldProps) => {
  const [field, meta, helpers] = useField<string>({ name, type: "string" });
  const hasFieldError = hasError<string>(meta);

  const regex = useMemo(() => new RegExp(`${field.value}`, "i"), [field.value]);

  const matches = useMemo(() => {
    return options.filter((option) => {
      const value = getOptionValue(option);

      return regex.test(value) && value !== field.value;
    });
  }, [field.value, getOptionValue, options, regex]);

  const onKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && matches.length > 0) {
        event.preventDefault();

        const match = matches[0];
        const value = getOptionValue(match);

        helpers.setValue(value);
      }
    },
    [getOptionValue, helpers, matches]
  );

  return (
    <Dropdown>
      {({ dropdownProps, handleClose, handleOpen, isOpen }) => (
        <FormGroup error={meta.error} hasError={hasFieldError} label={label}>
          <StandardInputField
            field={field}
            hasError={hasFieldError}
            name={name}
            onFocus={() => handleOpen()}
            onKeyPress={onKeyPress}
            placeholder={label}
            type="string"
          />

          {matches.length > 0 && isOpen && (
            <div {...dropdownProps}>
              <div className="max-h-sm overflow-scroll py-2">
                {matches.map((option) => {
                  const key = getOptionKey(option);
                  const value = getOptionValue(option);

                  return (
                    <div
                      className={`hover:bg-${colors.grayLighter} px-4 py-1`}
                      key={key}
                      onClick={() => {
                        handleClose();
                        helpers.setValue(value);
                      }}
                    >
                      <Highlighter id={key} query={field.value} value={value} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </FormGroup>
      )}
    </Dropdown>
  );
};

export default AutoSuggestField;
