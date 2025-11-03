import React from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios'; // Бібліотека для виконання HTTP-запитів
import type { CSSObjectWithLabel, } from 'react-select';

interface CityOption {
  value: string;
  label: string;
}

const loadCities = (inputValue: string, callback: (options: CityOption[]) => void) => {
  if (inputValue.length < 2) {
    callback([]);
    return;
  }

  axios.get(`https://your-api.com/api/cities/search?query=${inputValue}`)
    .then(response => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options: CityOption[] = response.data.map((city: any) => ({
        value: city.id,
        label: `${city.name}, ${city.country}`,
      }));

      callback(options);
    })
    .catch(error => {
      console.error("Помилка під час завантаження міст:", error);
      callback([]);
    });
};

const customStyles = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,

    border: 'none',
    boxShadow: 'none',
    minHeight: '40px',
    backgroundColor: 'transparent',
    marginLeft: '28px',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  valueContainer: (provided: CSSObjectWithLabel) => ({
    ...provided,
    padding: '0 8px',
  }),

  input: (provided: CSSObjectWithLabel) => ({
    ...provided,
    margin: '0',
    padding: '0',
  }),
};

const CitySearchSelect: React.FC = () => {
  const defaultCityOption: CityOption = {
    value: 'kyiv',
    label: 'Київ'
  };

  return (
    <>
      <div style={{ width: 282 }}>
        <AsyncSelect
          cacheOptions
          defaultOptions
          placeholder="Почніть вводити назву міста..."
          loadOptions={loadCities}
          onChange={(selected) => console.log('Вибрано місто:', selected)}
          styles={customStyles}
          defaultValue={defaultCityOption}
          components={{
            DropdownIndicator: null,
            IndicatorSeparator: () => null,
          }}
        />
      </div>
    </>
  );
};

export default CitySearchSelect;
