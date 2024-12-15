import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './SortDropdown.module.css';

const SortDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get current selected option
  const selectedOption = options.find(option => option.value === value);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle option selection
  const handleSelect = useCallback((option) => {
    onChange(option.value);
    setIsOpen(false);
  }, [onChange]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(prev => !prev);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }

      const currentIndex = options.findIndex(option => option.value === value);
      let nextIndex;

      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
      }

      onChange(options[nextIndex].value);
    }
  }, [isOpen, options, value, onChange]);

  return (
    <div 
      className={styles.dropdown} 
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <button
        className={`${styles.trigger} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Sort products"
      >
        <span>{selectedOption.label}</span>
        <ion-icon 
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul 
          className={styles.menu}
          role="listbox"
          aria-label="Sort options"
          tabIndex={-1}
        >
          {options.map((option) => (
            <li 
              key={option.value}
              role="option"
              aria-selected={option.value === value}
            >
              <button
                className={`${styles.option} ${
                  option.value === value ? styles.selected : ''
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
                {option.value === value && (
                  <ion-icon 
                    name="checkmark-outline"
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown; 