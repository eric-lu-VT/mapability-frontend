import React, { useState } from 'react';
import { Input, Stack, FormControl, Radio, Checkbox } from 'native-base';

interface FormProps {
  inputs: {
    label: string;
    placeholder: string;
    name: string;
  }[];
  radio?: {
    label: string;
    name: string;
    options: { label: string; value: string }[];
  };
  checkbox?: {
    label: string;
    name: string;
  };
}

export const Form: React.FC<FormProps> = ({ inputs, radio, checkbox }) => {
  const [radioValue, setRadioValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);

  const handleRadioChange = (value: string) => {
    setRadioValue(value);
  };

  const handleCheckboxChange = (value: boolean) => {
    setCheckboxValue(value);
  };

  return (
    <FormControl>
      <Stack space={5}>
        {inputs.map((input) => (
          <Stack key={input.name}>
            <FormControl.Label>{input.label}</FormControl.Label>
            <Input variant="underlined" p={2} placeholder={input.placeholder} name={input.name} />
          </Stack>
        ))}
        {radio && (
          <Stack>
            <FormControl.Label>{radio.label}</FormControl.Label>
            <Stack direction="row" space={5}>
              <Radio.Group name={radio.name} value={radioValue} onChange={handleRadioChange}>
                {radio.options.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Stack>
          </Stack>
        )}
        {checkbox && (
          <Stack>
            <FormControl.Label>{checkbox.label}</FormControl.Label>
            <Stack direction="row" space={5}>
              <Checkbox value={checkboxValue} onChange={handleCheckboxChange} name={checkbox.name} />
              <FormControl.HelperText>{checkbox.label}</FormControl.HelperText>
            </Stack>
          </Stack>
        )}
      </Stack>
    </FormControl>
  );
};
