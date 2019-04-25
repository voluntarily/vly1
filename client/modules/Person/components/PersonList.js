import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import PersonListItem from './PersonListItem/PersonListItem';

function PersonList(props) {
  return (
    <div className="listView">
      {
        props.people.map(person => (
          <PersonListItem
            person={person}
            key={person.cuid}
            // onDelete={() => props.handleDeletePerson(person.cuid)}
          />
        ))
      }
    </div>
  );
}

PersonList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
};

export default PersonList;
