/*
  Page to create or update a person
  if cuid = 0 then create a new person
  else get the person by cuid and edit their profile
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import PersonDetailForm from '../../components/PersonDetailForm/PersonDetailForm';
import { fetchPerson, addPersonRequest } from '../../PersonActions';
import { getPerson } from '../../PersonReducer';
import { message, Divider } from 'antd';

export class PersonUpdatePage extends Component {

  componentDidMount() {
    // cuid undefined or 0 means create new form otherwise edit the one given.
    if (this.props.params.cuid !== '0') {
      if (!this.props.person) {
        this.props.fetchPerson(this.props.params.cuid);
      }
    }
  }

  handleAddPerson = (person) => {
    this.props.addPersonRequest(person)
    .then((res) => {
      const cuid = (this.props.params.cuid !== '0') ?
        this.props.params.cuid : res.cuid;
      message.success('Record saved. ', cuid);
      this.props.router.push(`/people/${cuid}`);
    });
  };

  handleCancel = () => {
    this.props.router.goBack();
  }
  render() {
    return (
      <div>
        <h1>Profile for {this.props.person.moniker}</h1>
        <PersonDetailForm person={this.props.person} onSubmit={this.handleAddPerson} onCancel={this.handleCancel} />
        <br />
        <Divider />
        <pre>
          {JSON.stringify(this.props.person, null, 2)}
        </pre>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PersonUpdatePage.need = [params => {
  return (params.cuid && params.cuid !== '0')
    ? fetchPerson(params.cuid)
    : null;
}];


PersonUpdatePage.propTypes = {
  person: PropTypes.shape({
    cuid: PropTypes.string,
    name: PropTypes.string,
    moniker: PropTypes.string,
    about: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    gender: PropTypes.string,
    avatar: PropTypes.any,
    role: PropTypes.arrayOf(PropTypes.oneOf(['admin', 'op-provider', 'volunteer', 'content-provider', 'tester'])),
    status: PropTypes.oneOf(['active', 'inactive', 'hold']),
  }),
  params: PropTypes.shape({
    cuid: PropTypes.string.isRequired,
  }),
  fetchPerson: PropTypes.func.isRequired,
  addPersonRequest: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return ((props.params.cuid && props.params.cuid !== '0') ? {
    person: getPerson(state, props.params.cuid),
  } : {
    // for new ops load the default template doc.
    person: {
      cuid: '',
      name: '',
      moniker: '',
      about: '',
      email: '',
      phone: '',
      gender: '',
      avatar: '',
      role: ['volunteer'],
      status: 'inactive',
    },
  });
}

// export default connect(mapStateToProps)();

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchPerson, addPersonRequest })
)(PersonUpdatePage);
