import React, {useState, useCallback} from 'react';
import {useClassFor} from '../..';
import {Label} from './Form/Label';
import Input from './Input';
import '../styles/base/inputField.sass';
import '../styles/themes/UniLogin/inputFieldThemeUniLogin.sass';
import {classForComponent} from '../utils/classFor';
import {debounce, isClassName} from '@unilogin/commons';

interface InputFieldProps {
  value: string;
  setValue: (value: string) => void;
  error?: string;
  label?: string;
  className?: string;
  id: string;
  description?: string;
  type?: string;
}

export const InputField = ({value, setValue, label, description, id, className, error, type}: InputFieldProps) => {
  const descriptionClassName = useClassFor('input-description');
  return (<div className={`${useClassFor('input-wrapper')} ${isClassName(className)}`}>
    {label && <Label>{`${label}:`}</Label>}
    <Input
      type={type || 'text'}
      id={id}
      onChange={(event) => setValue(event.target.value)}
      value={value}
    />
    {description && <p className={descriptionClassName}>{description}</p>}
    {error && <p className={`${classForComponent('input-error-hint')}`}>{error}</p>}
  </div>);
};

export const useInputField = (validate: (value: string) => boolean, errorMessage: string): [string, (value: string) => void, string | undefined] => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const handleError = (value: string) => {
    const isValid = validate(value);
    if (value === '' || isValid) {
      setError('');
    } else if (!isValid) {
      setError(errorMessage);
    }
  };
  const debouncedHandleError = useCallback(debounce(handleError, 500), []);

  const updateValue = (value: string) => {
    setValue(value);
    debouncedHandleError(value);
  };
  return [value, updateValue, error];
};