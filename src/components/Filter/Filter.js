import { PropTypes } from 'prop-types';
import React from 'react';
import { nanoid } from 'nanoid';
import { InputFilterStyled } from './FilterStyled';
import { FilterLabelStyled } from './FilterStyled';

const Filter = ({ onChange }) => {
  const filterId = nanoid();
  return (
    <>
      <FilterLabelStyled htmlFor={filterId}>
        Find contacts by name
      </FilterLabelStyled>
      <InputFilterStyled
        type="text"
        id={filterId}
        onChange={onChange}
        name="filter"
      />
    </>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filter;
