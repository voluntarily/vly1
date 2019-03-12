import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import PersonListItem from './PersonListItem/PersonListItem';

function PersonList(props) {
  return (
    <div className="listView">
      <h1>People</h1>
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
    role: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  // handleDeletePerson: PropTypes.func.isRequired,
};

export default PersonList;
