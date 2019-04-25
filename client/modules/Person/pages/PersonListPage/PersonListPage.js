/*
  PersonListPage - a page listing all the people returned from fetchPeople
  results in simple vertical list
  Entry - people menu item.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PersonList from '../../components/PersonList';
import { fetchPeople } from '../../PersonActions';
import { getPeople } from '../../PersonReducer';

class PersonListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPeople());
  }

  render() {
    return (
      <div>
        <h1><FormattedMessage id="personListTitle" defaultMessage="People" description="H1 on Person list page" /></h1>
        <PersonList people={this.props.people} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PersonListPage.need = [() => { return fetchPeople(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    people: getPeople(state),
  };
}

PersonListPage.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

PersonListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(PersonListPage);
