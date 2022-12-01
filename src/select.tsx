import { useState, useEffect } from "react";
import styles from "./select.module.css";

type selectOption = {
  label: string;
  value: any;
};

type Props = {
  value?: selectOption;
  onChange: (value: selectOption | undefined) => void;
  options: selectOption[];
};

const Select = ({ value, onChange, options }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const clearOptions = () => {
    onChange(undefined);
  };

  const selectOption = (option: selectOption) => {
    onChange(option);
  };

  const isOptionSelected = (option: selectOption) => {
    return option.value === value?.value;
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(-1);
  }, [isOpen]);

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      className={styles.container}
      tabIndex={0}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.label}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            } ${index === highlightedIndex ? styles.highlighted : ""} `}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Select };
