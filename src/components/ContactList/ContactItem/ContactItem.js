import { PropTypes } from 'prop-types';
import React from 'react';
import { ContactItemStyled } from './ContactItemStyled';
import { ContactNameItemStyled } from './ContactItemStyled';
import { ButtonItemStyled } from './ContactItemStyled';

const ContactItem = ({ contact, onDelete }) => {
  const { id, name, number } = contact;
  return (
    <ContactItemStyled>
      <ContactNameItemStyled>
        {name}: {number}
      </ContactNameItemStyled>
      <ButtonItemStyled onClick={() => onDelete(id)} type="button">
        Delete
      </ButtonItemStyled>
    </ContactItemStyled>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),

  onDelete: PropTypes.func,
};

export default ContactItem;
